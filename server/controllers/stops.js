import { Router } from 'express'
import xRay from 'x-ray'
const xray = xRay()
import { slice } from 'ramda'

import Stop from '../models/stop'
import Route from '../models/route'

import { convertStopData } from './helpers'

const stopRouter = Router()

stopRouter.get('/', function handleHome (req, res) {
  const { ID, direction } = req.query

  xray(`http://www.ltconline.ca/webwatch/MobileAda.aspx?r=${ID}&d=${direction}`,
   'a',
    [{
      name: '@html',
      link: '@href'
    }]
  )(function handleXrayResult (err, result) {
    if (!!err) {
      res.json({
        message: 'Error with xray',
        _error: err
      })
    }
    // gets rid of the back link, Mobile Live Arrival Times and WebWatch Home
    result = slice(0, result.length - 3, result)
    result.map(async function saveEachResult (obj) {
      const data = convertStopData(obj)
      const routeObject = await Route.findOne({ 'ID': data.route }, 'name').exec()

      Stop.findOneAndUpdate(
        {'stop': data.stop}, // search by unique London bus stopsID
        {...data, routeName: routeObject.name}, // spread data and then add routeName
        {upsert: true} // create new doc if non exist
      ).exec()
        .then(function saveSuccess () {
          console.log(`StopID ${data.stop} saved`)
        })
        .catch(function errorHandler (error) {
          console.log(error)
        })
    })
  })
})

export default stopRouter
