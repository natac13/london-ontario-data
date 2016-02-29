import { Map } from 'immutable'

import {
 STORE_FILTERED_MAP,
 COPY_ID_MAP
} from '../constants/'

import {
  busStopsFilter
} from '../js/core'

const initialState = Map({
  filteredMap: Map()
})

function storeMap (state, action) {
  return state.set(
    'filteredMap',
    busStopsFilter(action.payload.stopIDMap, action.payload.stopID)
  )
}

function storage (state = initialState, action) {
  switch (action.type) {
    case STORE_FILTERED_MAP:
      return storeMap(state, action)
    case COPY_ID_MAP:
      return state.set('filteredMap', action.payload)
    default:
      return state
  }
}

export default storage

