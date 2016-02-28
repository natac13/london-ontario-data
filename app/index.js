import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Immutable from 'immutable'
import installDevTools from 'immutable-devtools'
installDevTools(Immutable)
import React from 'react'
import { render } from 'react-dom'
// import Router            from 'react-router';
import { Provider } from 'react-redux'
// import routes            from './config/routes';
import { Map } from 'immutable'

import './scss/setup'

import App from './containers/App/'

import configureStore from './store/configureStore'
const store = configureStore(Map())

const rootElement = document.getElementById('root')
// import { history } from './store/configureStore';

// render((
//     <Provider store={store}>
//         <Router history={history} >
//             {routes}
//         </Router>
//     </Provider>
// ), rootElement);

render((
  <Provider store={store} >
    <App />
  </Provider>
), rootElement)
