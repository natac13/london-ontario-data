import { Map, fromJS } from 'immutable'
import R from 'ramda'

/**
 * Given a routeID which return a function that will accept an array of objects.
 * These object are representing
 * @param  {[type]} routeID [description]
 * @return {[type]}         [description]
 */
function getNameFromMatchedObject (routeID) {
  return R.compose(R.prop('name'), R.find(R.propEq('ID', routeID)))
}

/**
 * Will return a hash map of the bus stops to a list of bus routes with the
 * route direction
 * Will take in json data which is a list of route object. Each route object has
 * properties 'stop', 'route', and 'direction'
 * Stop keys are numbers and not strings
 * @param  {array} data
 * @return {Immutable Map}
 */
function createBusStopsMap (data) {
  return data.reduce((acc, obj) => {
    if (!acc.has(obj.stop)) {
      return acc.set(obj.stop, fromJS([{
        route: obj.route,
        direction: obj.direction,
        name: obj.routeName
      }]))
    } else {
      return acc.update(obj.stop, (val) => {
        return val.push(Map({
          route: obj.route,
          direction: obj.direction,
          name: obj.routeName
        }))
      })
    }
  }, Map())
}

/**
 * Given a number with return the length of how many digits.
 * @param [Number]
 * @return [Number]
 */
const getNumberLength = R.compose(R.length, R.toString)

/**
 * busStopsFilter :: Map a -> Number b -> Map a
 * Will filter a busStopsMap down base on the userInput
 * Will compare the userInput to the busStop key from stopsMap. However the
 * busStop is cut down with R.take(userInput.length)
 * @param  {Map}    stopsMap
 * @param  {Number} userInput
 * @return {Map}
 */
function busStopsFilter (stopsMap, userInput = '') {
  if (userInput === '') { return stopsMap }
  return stopsMap.filter((routeList, stop) => {
    return stop === userInput
  })
}

function findStartingMap (stopIDMap, filteredMap = Map()) {
  if (filteredMap.size > 0) {
    return filteredMap
  } else {
    return stopIDMap
  }
}

export {
  findStartingMap,
  busStopsFilter,
  getNumberLength,
  createBusStopsMap,
  getNameFromMatchedObject
}
