import { fromJS } from 'immutable'
import { TIMES_FETCH } from '../constants/'

const initialState = fromJS({
  arrivalTimes: [],
  lastUpdated: ''
})

function routeTimes (state = initialState, action) {
  switch (action.type) {
    case TIMES_FETCH:
      return state.merge(fromJS(action.payload.data))
    default:
      return state
  }
}

export default routeTimes
