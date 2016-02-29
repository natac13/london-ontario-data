import { combineReducers } from 'redux-immutable'
import { routeReducer } from 'redux-simple-router'
import { reducer as formReducer } from 'redux-form'
import { fromJS } from 'immutable'
import { mergeAll } from 'ramda'

import initialData from './initialData'
import storage from './storage'
import fetch from './fetch'

const rootReducer = combineReducers(mergeAll([
  {},
  {
    initialData,
    storage,
    fetch
  },
  {
    routing: routeReducer,
    form: (state, action) => fromJS(formReducer(state, action))
  }

]))

export default rootReducer
