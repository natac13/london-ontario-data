import React from 'react'

import { Route, IndexRoute } from 'react-router'
import App from '../containers/App'
import Search from '../components/Search/'
import RouteTimesWrapper from '../components/RouteTimesWrapper/'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Search} />
    <Route path='/routeTimes/:routeNumber/:direction/:stopID' component={RouteTimesWrapper} />
  </Route>
)
