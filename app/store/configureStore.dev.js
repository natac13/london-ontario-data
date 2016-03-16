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
  console.log('deserialize')
  console.log(string)
  const data = JSON.parse(string)
  console.log(data)
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
    console.log(persistent)
    console.log('merge')
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
      applyMiddleware(
        router,
        promiseMiddleware,
        loggerMiddleware
      ),
      persistState(storagePaths, storageConfig)
    )
  )
}
