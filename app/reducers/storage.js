import { Map } from 'immutable'

import {
 STORE_FILTERED_MAP,
 COPY_ID_MAP
} from '../constants/'

const initialState = Map({
  filteredMap: Map()
})

function storage (state = initialState, action) {
  switch (action.type) {
    case STORE_FILTERED_MAP:
      return state.set('filteredMap', action.payload)
    case COPY_ID_MAP:
      return state.set('filteredMap', action.payload)
    default:
      return state
  }
}

export default storage

