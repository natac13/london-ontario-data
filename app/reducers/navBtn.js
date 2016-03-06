import { Map } from 'immutable'
import {
  NAV_OPEN,
  NAV_CLOSE
} from '../constants'

const initialState = Map({
  isOpen: false
})
function navBtn (state = initialState, action) {
  switch (action.type) {
    case NAV_OPEN:
      return state.set('isOpen', true)
    case NAV_CLOSE:
      return state.set('isOpen', false)
    default:
      return state
  }
}

export default navBtn
