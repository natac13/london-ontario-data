import allStops from '../resources/allStops.json'

import { createBusStopsMap } from '../js/core'

import {
  writeFile
} from 'fs'
import { promisify } from 'bluebird'

const fw = promisify(writeFile)

const result = createBusStopsMap(allStops)

// change the immutable result to plain array of objects
const final = result.toJS()

// file path from root or where the file is run
fw('./app/resources/stopIDMap.json', JSON.stringify(final, null, 4))
  .then(function success (result) {
    console.log('Done making the stopIDMap')
  })
  .catch(function errorHandler (error) {
    console.error(`File not created due to error ${error}`)
  })

