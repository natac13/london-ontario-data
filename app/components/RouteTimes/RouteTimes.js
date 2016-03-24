import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import axios from 'axios'
import { lifecycle } from 'recompose'

import ProgressBar from 'react-toolbox/lib/progress_bar'

import style from './style.scss'

function RouteTimes (props) {
  const { asyncState } = props
  return (
    <div className={style.wrapper}>
      {asyncState.get('success')
      ? <p>Got route Times!</p>
      : <ProgressBar type='circular' mode='indeterminate' />}
    </div>
  )
}

RouteTimes.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object,
  actions: PropTypes.object,
  asyncState: ImmutablePropTypes.map
}

function setup (component) {
  const {
    actions,
    params: {
      routeNumber,
      direction,
      stopID
    }
  } = component.props
  // sets a fetching flag on the state tree.
  actions.request()
  // dispatch a promise to be unpacked by redux-promise to send the result to
  // the reducer to update the state tree with the route times
  actions.routeTimeFetch(axios.get(`/fetch/times/${routeNumber}/${direction}/${stopID}`))
    .then(function fulfilled () {
      actions.requestSuccess()
    })
}

// Looking at the source code for lifecycle it does not look like this is
// optional....
function teardown () {
  return null
}

// wrapping the component in a Higher Order Component (HCO)
export default lifecycle(
  setup,
  teardown
)(RouteTimes)
