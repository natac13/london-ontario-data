import xRay from 'x-ray'
const xray = xRay()

import { map, slice, compose } from 'ramda'
import { writeFile } from 'fs'
import routeNames from '../resources/routes.json'

import { getNameFromMatchedObject } from '../js/core'
import { convertStopData } from '../../server/controllers/helpers'
export const addRouteName = (route) => {
  return {
    ...route,
    routeName: getNameFromMatchedObject(route.route)(routeNames)
  }
}

const convertDataList = map(compose(addRouteName, convertStopData))

// import mongoose from 'mongoose'
// mongoose.Promise = require('bluebird')
// import Stop from '../../server/models/stop'
// import Route from '../../server/models/route'

const routeID = process.argv[2]
const direction = process.argv[3]
console.log(`Getting StopID data for route: ${routeID}, heading in the ${direction} direction`)

// async function saveEachResult (obj) {
//   const data = convertData(obj)
//   const routeObject = await Route.findOne({ 'ID': data.route }, 'name').exec()

//   Stop.findOneAndUpdate(
//     {'stop': data.stop}, // search by unique London bus stopsID
//     {...data, routeName: routeObject.name}, // spread data and then add routeName
//     {upsert: true} // create new doc if non exist
//   ).exec()
//     .then(function saveSuccess () {
//       console.log(`StopID ${data.stop} saved`)
//     })
//     .catch(function errorHandler (error) {
//       console.log(error)
//     })
// }

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
  // map(saveEachResult, result)

  /**
   * Write to File version
   */
  const toFile = `app/resources/Stops/${routeID}-${direction}.json`
  writeFile(
    toFile,
    JSON.stringify(convertDataList(result), null, 4),
    () => {
      console.log(`Done with ${toFile}`)
    }
  )
  // setTimeout(() => {
  //   mongoose.connection.close()
  // }, 5000)
})

// require('dotenv').load()
// mongoose.connect(process.env.MONGO_URI)
//   .then(function connectHandler () {
//     console.log('Connected to mongoDB via mongoose: Local')

//   })
//   .catch(function errorHandler (error) {
//     throw error
//   })
