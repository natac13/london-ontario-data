import {
  STORE_FILTERED_MAP,
  COPY_ID_MAP
} from '../constants/'

import { createAction } from 'redux-actions'

export const storeFilteredMap = createAction(STORE_FILTERED_MAP)
export const copy = createAction(COPY_ID_MAP)
