import { indexOf, slice } from 'ramda'

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
export {
  convertData
}
