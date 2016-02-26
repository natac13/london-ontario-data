import { createStore, applyMiddleware } from 'redux'
// import { compose } from 'ramda'
// Middlewares
import logger from 'redux-logger'
import { syncHistory } from 'redux-simple-router'
//  localStorage
// import persistState from 'redux-localstorage';
// const storagePaths = ['initialData', 'stopIDMap']
// const storageConfig = {
//   slicer(paths) {
//     return (state) => {
//       let subset = {};
//       state.get(paths)

//       return subset;
//     };
//   },
//   serialize(collection) {

//   },
//   deserialize(string) {

//   }
// };
//
// Might need to create a new piece of state to hold the results so that they are
// stored to localstorage

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
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      reduxRouterMiddleware,
      loggerMiddleware
    )
  )
}
