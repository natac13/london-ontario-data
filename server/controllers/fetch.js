import express from 'express'
import xRay from 'x-ray'
import { map } from 'ramda'
import Promise from 'bluebird'
import {
  pXray,
  convertRouteData,
  dropLastThree
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

export default router
