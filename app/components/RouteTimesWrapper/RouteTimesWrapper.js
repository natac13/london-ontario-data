import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import axios from 'axios'
import { lifecycle, pure, compose, withProps } from 'recompose'
import { curry } from 'ramda'

import ProgressBar from 'react-toolbox/lib/progress_bar'
import { IconButton } from 'react-toolbox/lib/button'
import Icon from 'react-fa'
import RouteTimes from '../RouteTimes/'

import style from './style.scss'

function RouteTimesWrapper (props) {
  const {
    asyncState,
    routeTimes,
    actions: { push },
    goHome,
    params
  } = props
  const lastUpdated = routeTimes.get('lastUpdated')
  const arrivalTimesList = routeTimes.get('arrivalTimes')
  return (
    <div className={style.wrapper}>
      <IconButton
        className={style.backBtn}
        icon={<Icon name='angle-double-left'/>}
        onClick={goHome(push)}
      />

      {asyncState.get('success')
      ? <RouteTimes
        lastUpdated={lastUpdated}
        arrivalTimes={arrivalTimesList}
        stopID={params.stopID}
        />
      : <ProgressBar type='circular' mode='indeterminate' />}
    </div>
  )
}

RouteTimesWrapper.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object,
  actions: PropTypes.object,
  asyncState: ImmutablePropTypes.map,
  routeTimes: ImmutablePropTypes.map,
  goHome: PropTypes.func
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

const goHome = curry(function goHome (push, event) {
  event.preventDefault()
  return push('/')
})

// wrapping the component in a Higher Order Component (HCO)
export default compose(
  pure,
  withProps({ goHome }),
  lifecycle(
    setup,
    teardown
  ),
)(RouteTimesWrapper)
