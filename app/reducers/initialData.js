import { Map, fromJS } from 'immutable'

import {
  CREATE_STOPID_MAP
} from '../constants/'

const initialState = Map({
  stopIDMap: Map()
})

const initialData = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STOPID_MAP:
      return state.set('stopIDMap', fromJS(action.payload.data))
    default:
      return state
  }
}

export default initialData
