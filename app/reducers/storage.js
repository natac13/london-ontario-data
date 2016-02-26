import { Map, List } from 'immutable'

import {
 STORE_FILTERED_MAP
} from '../constants/'

const initialState = Map({
  filteredList: List()
})

export function storage (state = initialState, action) {
  switch (action.type) {
    case STORE_FILTERED_MAP:
      return state.set('filteredList', action.payload)
    default:
      return state
  }
}
