import { curry, compose } from 'ramda'
import { Map } from 'immutable'

import {
    FETCH,
    FETCH_FAIL,
    FETCH_SUCCESS
} from '../constants/'

const boolUpdater = curry(function (what, toBool, state) {
  return state.update(what, (what) => toBool)
})

/**
 * Functions that is looking for a state immutable map to run update on
 */
const fetchingData = boolUpdater('fetching', true)
const noFetching = boolUpdater('fetching', false)
const didSucceed = boolUpdater('success', true)
const noSuccess = boolUpdater('success', false)
const failedData = boolUpdater('didFail', true)
const noFail = boolUpdater('didFail', false)

export const request = compose(fetchingData, noFail, noSuccess)
export const success = compose(noFetching, noFail, didSucceed)
export const failed = compose(failedData, noFetching, noSuccess)

const initialState = Map({
  fetching: false,
  didFail: false,
  success: false
})

function fetch (state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return request(state)
    case FETCH_FAIL:
      return failed(state)
    case FETCH_SUCCESS:
      return success(state)
    default:
      return state
  }
}

export default fetch
