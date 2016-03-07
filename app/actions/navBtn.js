import {
  NAV_OPEN,
  NAV_CLOSE
} from '../constants'

import { createAction } from 'redux-actions'

export const navOpen = createAction(NAV_OPEN)
export const navClose = createAction(NAV_CLOSE)
