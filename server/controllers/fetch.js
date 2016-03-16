import express from 'express'
import xRay from 'x-ray'
import { map } from 'ramda'
import moment from 'moment'
import Promise from 'bluebird'
import {
  pXray,
  convertRouteData,
  dropLastThree,
  transformArrivalTime
} from './helpers'

import Route from '../models/route'

const router = express.Router()

const convertListOfData = map(convertRouteData)

const x = xRay() // need for the nested scrapping.
/*
The nested scraping that is happening cannot be done with the installed version
of x-ray from npm. Need to install branch bugfix/nested-crawling, which is
handled via the package.json file point to the github repo for x-ray.

PLUS! change lines 114 and 115 in the index.js file of x-ray to respectively

debug('%s is not a url. Skipping', url);
return node.html(load(""), next);

I have forked the repo and made this change on my version. However this app
does not point to my version of xray at this time.
*/

router.get('/routes', function getHandler (req, res) {
  pXray('http://www.ltconline.ca/webwatch/MobileADA.aspx', 'a',
      [{
        link: '@href',
        name: '@html',
        directionLinks: x('@href', ['a@href']) // navigates the link and scraps
      }])
  .then(
    function fullfill (result) {
      // take the result from xray and covert it into the form I want
      const data = convertListOfData(dropLastThree(result))
      res.json(data)
      return data
    },
    function rejected (err) {
      const error = {
        message: 'There was an error with xray scrapping the data.',
        _error: err
      }
      res.json(error)
      return err
    })
  .then(function fullfillApi (data) {
    // create an array of promise to send to promise.all by mapping over the
    // data list of routes
    const dataPromises = data.map((route) => {
      const query = { 'ID': route.ID }
      const options = { upsert: true } // will create new if doesn't exist
      return Route.findOneAndUpdate(query, route, options)
    })
    return Promise.all(dataPromises) // return after all have resolved.
  })
  .then(function fullfillDB (docs) {
    // docs is an arrray of the docs even if they were not updated.
    console.log('Routes have been add/updated on MongoDB')
  })
  .catch(function cleanUp (err) {
    console.log(err)
  })
})

const timeRoute = '/times/:routeNumber/:direction/:stopID'
router.get(timeRoute, async function getHandler (req, res) {
  const baseUrl = 'http://www.ltconline.ca/webwatch/MobileAda.aspx?'
  const {
    routeNumber,
    direction,
    stopID
  } = req.params

  // the LTC url to srcap from
  const path = `${baseUrl}r=${routeNumber}&d=${direction}&s=${stopID}`

  // regex expressions to get arrivalTimes and the lastUpdated time.
  const regexTimes = /(\d?:\d{2}\s*.{4})\s*TO\W?(\w|\s)*/gi
  const regexLastUpdate = /\d{1,2}:\d{2}:\d{2}\s(?:PM|AM)\s\d{1,2}\/\d{1,2}\/\d{4}/g

  try {
    // asynchronous Data fetching
    const scrappedData = await pXray(path, 'div div', '@html')

    // find the arrivalTimes list and make a nicely formatted date
    const arrivalTimes = scrappedData.match(regexTimes)
    const badDate = new Date(scrappedData.match(regexLastUpdate))
    const niceDate = moment(badDate).format('MMMM Do, YYYY hh:mm:ss A')
    // Object to send to the client
    const result = {
      lastUpdated: niceDate,
      arrivalTimes: map(transformArrivalTime, arrivalTimes)
    }

    // handle the response itself
    res.status(200)
    res.json(result)
  } catch (err) {
    // Create an nice error message.
    const error = {
      message: 'Error getting the route times from LTC site',
      _error: err
    }
    res.status(500)
    res.json(error)
  }
})

export default router
