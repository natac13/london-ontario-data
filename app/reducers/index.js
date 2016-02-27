import { combineReducers } from 'redux-immutable'
import { routeReducer } from 'redux-simple-router'
import { reducer as formReducer } from 'redux-form'
import { fromJS } from 'immutable'

import initialData from './initialData'
import storage from './storage'

const rootReducer = combineReducers(Object.assign(
  {},
  {
    initialData,
    storage
  },
  {
    routing: routeReducer,
    form: (state, action) => fromJS(formReducer(state, action))
  }

))

export default rootReducer
