import { Map } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

function routing (state = Map({ locationBeforeTransitions: null }), action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({ locationBeforeTransitions: action.payload })
    default:
      return state
  }
}

export default routing
