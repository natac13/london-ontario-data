import {
  FETCH,
  FETCH_FAIL,
  FETCH_SUCCESS
} from '../constants/'

import { createAction } from 'redux-actions'

export const fetch = createAction(FETCH)
export const fetchFail = createAction(FETCH_FAIL)
export const fetchSuccess = createAction(FETCH_SUCCESS)
