import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from './config/routes'
import { Map } from 'immutable'
import { syncHistoryWithStore } from 'react-router-redux'

/** Global styles */
import './scss/setup'

import configureStore from './store/configureStore'
const store = configureStore(Map())

/** Custom select function since the stat is using redux-immutable */
const syncOptions = {
  selectLocationState: (state) => state.get('routing').toJS()
}
const history = syncHistoryWithStore(browserHistory, store, syncOptions)

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Immutable dev tools makes for easier viewing of Maps and Lists in the
// Chrome Developer tools.
import Immutable from 'immutable'
import installDevTools from 'immutable-devtools'
installDevTools(Immutable)

const rootElement = document.getElementById('root')

render((
  <Provider store={store}>
    <Router history={history} >
      {routes}
    </Router>
  </Provider>
), rootElement)
