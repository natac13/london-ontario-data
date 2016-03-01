import xRay from 'x-ray'
const xray = xRay()

import { map, slice } from 'ramda'
// import { writeFile } from 'fs'

import { convertData } from '../../server/controllers/helpers'
// const convertDataList = map(convertData)

import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')
import Stop from '../../server/models/stop'
import Route from '../../server/models/route'

const routeID = process.argv[2]
const direction = process.argv[3]
console.log(`Getting StopID data for route: ${routeID}, heading in the ${direction} direction`)

async function saveEachResult (obj) {
  const data = convertData(obj)
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
}

mongoose.connect('mongodb://127.0.0.1:27017/ltc')
  .then(function connectHandler () {
    console.log('Connected to mongoDB via mongoose: Local')
    xray(`http://www.ltconline.ca/webwatch/MobileAda.aspx?r=${routeID}&d=${direction}`, 'a',
      [{
        name: '@html',
        link: '@href'
      }]
    )(function handleXrayResult (err, result) {
      if (err) { throw err }

      // gets rid of the back link, Mobile Live Arrival Times and WebWatch Home
      result = slice(0, result.length - 3, result)
      /*
      MongoDb version
       */
      map(saveEachResult, result)

      /**
       * Write to File version
       */
      // const toFile = `app/resources/Stops/${routeID}-${direction}.json`
      // writeFile(
      //   toFile,
      //   JSON.stringify(convertDataList(result), null, 4),
      //   () => {
      //     console.log(`Done with ${toFile}`)
      //   }
      // )
    })
  })
  .catch(function errorHandler (error) {
    throw error
  })
