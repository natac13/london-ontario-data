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
const middlewares = [router, promiseMiddleware]
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware) // no need for logging in production...
}

//  localStorage
import persistState from 'redux-localstorage'

function serialize (collection) {
  try {
    // if the collection is a immutable data structure returned the serialized
    // version
    return JSON.stringify(collection.toJS())
  } catch (err) {
    return null
  }
}

function deserialize (string) {
  // The string could be "null" which needs to be parsed to null.
  const data = JSON.parse(string)
  if (data) {
    return fromJS(data)
  } else {
    return data
  }
}

const storagePaths = ['storage', 'filteredMap']
const storageConfig = {
  slicer: (paths) => (state) => state.getIn(paths),
  serialize,
  deserialize,
  merge: (initial, persistent) => {
    if (persistent) {
      return initial.setIn(['storage', 'filteredMap'], persistent)
    } else {
      return initial
    }
  }
}

export default function configureStore (initialState) {
    // applyMiddleware supercharges createStore with middleware:
    // We can use it exactly like “vanilla” createStore.
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      persistState(storagePaths, storageConfig)
    )
  )
}
