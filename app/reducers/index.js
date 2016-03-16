import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form'
import { fromJS } from 'immutable'
import { mergeAll } from 'ramda'

import initialData from './initialData'
import storage from './storage'
import asyncState from 'redux-async-state-reducer'
import routing from './routing'
import navBtn from './navBtn'
import routeTimes from './routeTimes'

const rootReducer = combineReducers(mergeAll([
  {},
  {
    initialData,
    storage,
    asyncState,
    navBtn,
    routeTimes
  },
  {
    routing,
    form: (state, action) => fromJS(formReducer(state, action))
  }

]))

export default rootReducer
