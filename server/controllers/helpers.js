import Promise from 'bluebird'
import { indexOf, slice, take, split, remove, join, compose } from 'ramda'
import { capitalizeEachWord } from '../../app/js/format'
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
/**
 * fn :: string -> string
 */
const removeThree = compose(join(''), remove(0, 3))

/**
 * fn :: string -> object
 * Will split the given string on more than 2 spaces. '9:50 P.M.   TO Downtown'
 * Then return an object that has a property, time unformatted due to Date and
 * moment not recognizing it. Second property is the destination with the TO
 * part removed form a nicer endpoint response
 * @param  {string} arrivalString
 * @return {object}
 */
function transformArrivalTime (arrivalString) {
  const re = /\s{2,}/
  const [ time, destination ] = split(re, arrivalString)
  return {
    time,
    destination: removeThree(destination)
  }
}

export {
  convertStopData,
  convertRouteData,
  pXray,
  dropLastThree,
  transformArrivalTime
}
