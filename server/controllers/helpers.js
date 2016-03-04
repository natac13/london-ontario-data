import Promise from 'bluebird'
import { indexOf, slice, take } from 'ramda'
import { getNameFromMatchedObject } from '../../app/js/core'
import { capitalizeEachWord } from '../../app/js/format'
import routeNames from '../../app/resources/routes.json'
import xRay from 'x-ray'
const xray = xRay()

const getRouteID = (link) => {
  const start = indexOf('r=', link) + 2
  const end = start + 2
  return slice(start, end, link)
}

const getDirection = (link) => {
  const start = indexOf('d=', link) + 2
  const end = start + 1
  return slice(start, end, link)
}

const getStopID = (link) => {
  const start = indexOf('s=', link) + 2
  return slice(start, link.length, link)
}

function convertStopData (obj) {
  return {
    name: obj.name,
    route: getRouteID(obj.link),
    direction: getDirection(obj.link),
    stop: getStopID(obj.link)
  }
}
const takeTwo = take(2)
const dropLastThree = slice(0, -3)

function convertRouteData (obj) {
  const [a, b] = takeTwo(obj.directionLinks)
  return {
    name: capitalizeEachWord(obj.name),
    ID: getRouteID(obj.link),
    directions: [
      getDirection(a),
      getDirection(b)
    ]
  }
}

function addRouteName (route) {
  return {
    ...route,
    routeName: getNameFromMatchedObject(route.route)(routeNames)
  }
}

/**
 * Promise version of the xray scraping function
 * See xray docs for usage.
 * @return {Promise}
 */
function pXray (url, scope, selector) {
  return new Promise((resolve, reject) => {
    xray(url, scope, selector)(function handleXray (error, result) {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

export {
  convertStopData,
  convertRouteData,
  addRouteName,
  pXray,
  dropLastThree
}
