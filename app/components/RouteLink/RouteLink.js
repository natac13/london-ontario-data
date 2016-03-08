import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { curry } from 'ramda'

import findDirection from '../../js/findDirection'
import directionMap from '../../constants/directionMap'

import Icon from 'react-fa'

import style from './style'

function RouteLink (props) {
  const {
    route,
    stopKey
  } = props

  const handleClick = curry(function (routeNumber, direction, stopKey, event) {
    event.preventDefault()
    props.actions.push(`/routeTimes/${routeNumber}/${direction}/${stopKey}`)
  })

  const routeNumber = route.get('route')
  const name = route.get('name')
  const direction = route.get('direction')
  const display = findDirection(directionMap, direction)

  return (
    <a
      key={routeNumber}
      className={style.route}
      onClick={handleClick(routeNumber, direction, stopKey)} >
      <span className={style.routeNumber}>
        {routeNumber}
      </span>
      &nbsp;
      {name}
      &nbsp;
      <span className={style.routeDirection}>
        {display.get('heading')}
        &nbsp;
        <Icon name={`long-arrow-${display.get('arrow')}`}/>
      </span>
    </a>
  )
}

RouteLink.propTypes = {
  route: ImmutablePropTypes.map,
  stopKey: PropTypes.string,
  actions: PropTypes.object
}

export default RouteLink
