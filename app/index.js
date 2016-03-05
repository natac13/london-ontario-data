import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
// import routes            from './config/routes';
import { Map } from 'immutable'
import { syncHistoryWithStore } from 'react-router-redux'

/** Global styles */
import './scss/setup'

import App from './containers/App/'

import configureStore from './store/configureStore'
const store = configureStore(Map())

/** Custom select function since the stat is using redux-immutable */
const syncOptions = {
  selectLocationState: (state) => state.get('routing').toJS()
}
const history = syncHistoryWithStore(browserHistory, store, syncOptions)

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Immutable from 'immutable'
import installDevTools from 'immutable-devtools'
installDevTools(Immutable)

const rootElement = document.getElementById('root')

render((
  <Provider store={store}>
    <Router history={history} >
      <Route path='/' component={App}/>
    </Router>
  </Provider>
), rootElement)

// render((
//   <Provider store={store} >
//     <App />
//   </Provider>
// ), rootElement)
