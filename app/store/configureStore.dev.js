import { createStore, applyMiddleware } from 'redux'
import { fromJS } from 'immutable'
import { compose } from 'ramda'
import { browserHistory } from 'react-router'

import rootReducer from '../reducers/'

// Middlewares
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import { routerMiddleware } from 'react-router-redux'

const loggerMiddleware = logger()
const router = routerMiddleware(browserHistory)

//  localStorage
import persistState from 'redux-localstorage'

const storagePaths = ['storage', 'filteredMap']
const storageConfig = {
  slicer: (paths) => (state) => state.getIn(paths),
  serialize: (collection) => JSON.stringify(collection.toJS()),
  deserialize: (string) => fromJS(JSON.parse(string)),
  merge: (initial, persistent) => {
    return initial.setIn(['storage', 'filteredMap'], persistent)
  }
}

export default function configureStore (initialState) {
    // applyMiddleware supercharges createStore with middleware:
    // We can use it exactly like “vanilla” createStore.
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        router,
        promiseMiddleware,
        loggerMiddleware
      ),
      persistState(storagePaths, storageConfig)
    )
  )
}
