import { indexOf, slice } from 'ramda'
import { getNameFromMatchedObject } from '../../app/js/core'
import routeNames from '../../app/resources/routes.json'

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

function convertData (obj) {
  return {
    name: obj.name,
    route: getRouteID(obj.link),
    direction: getDirection(obj.link),
    stop: getStopID(obj.link)
  }
}

function addRouteName (route) {
  return {
    ...route,
    routeName: getNameFromMatchedObject(route.route)(routeNames)
  }
}

export {
  convertData,
  addRouteName
}
