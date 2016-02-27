import { createStore, applyMiddleware } from 'redux'
import { fromJS } from 'immutable'
import { compose } from 'ramda'

// Middlewares
import logger from 'redux-logger'
import { syncHistory } from 'redux-simple-router'

//  localStorage
import persistState from 'redux-localstorage'
const storagePaths = ['storage', 'filteredMap']
const storageConfig = {
  slicer (paths) {
    return (state) => {
      return state.getIn(paths)
    }
  },
  serialize (collection) {
    return JSON.stringify(collection.toJS())
  },
  deserialize (string) {
    return fromJS(JSON.parse(string))
  },
  merge (initial, persistent) {
    console.log('mmerge')
    console.log(persistent)

    return initial.setIn(['storage', 'filteredMap'], persistent)
  }
}
const createPresistentStore = compose(
  persistState(storagePaths, storageConfig)
)(createStore)

import rootReducer from '../reducers/'

import { createHistory } from 'history'

export const history = createHistory()
// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(history)

const loggerMiddleware = logger()

import Immutable from 'immutable'
import installDevTools from 'immutable-devtools'
installDevTools(Immutable)

export default function configureStore (initialState) {
    // applyMiddleware supercharges createStore with middleware:

    // We can use it exactly like “vanilla” createStore.
  return createPresistentStore(
    rootReducer,
    initialState,
    applyMiddleware(
      reduxRouterMiddleware,
      loggerMiddleware
    )
  )
}
