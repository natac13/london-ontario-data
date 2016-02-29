import { Map, fromJS } from 'immutable'
import { curry } from 'ramda'

import { firstLetter } from './format'

const findDirection = curry((directionMap, ltcDirection) => {
  if (!Map.isMap(directionMap)) {
    try {
      directionMap = fromJS(directionMap)
      if (!directionMap.has('1')) {
        return new Error('No properties of ltcDirection values; being "1", "2", "3" or "4"')
      }
    } catch (error) {
      return false
    }
  }

  if (typeof ltcDirection !== 'string') {
    try {
      ltcDirection = ltcDirection.toString()
    } catch (error) {
      return false
    }
  }

  return Map({
    heading: firstLetter(directionMap.getIn([ltcDirection, 'direction'])),
    arrow: directionMap.getIn([ltcDirection, 'arrow'])
  })
})

export default findDirection

