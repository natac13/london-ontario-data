import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { curry } from 'ramda'
import { withProps } from 'recompose'

// these are inject with the 'withProps function'
import findDirection from '../../js/findDirection'
import directionMap from '../../constants/directionMap'

import Icon from 'react-fa'

import style from './style.scss'

function RouteLink (props) {
  const {
    route,
    stopKey,
    actions: { push }, // nested destructuring
    findDirection,
    directionMap
  } = props

  const routeNumber = route.get('route')
  const name = route.get('name')
  const direction = route.get('direction')
  const display = findDirection(directionMap, direction)

  return (
    <a
      key={routeNumber}
      className={style.route}
      onClick={handleClick(routeNumber, direction, stopKey, push)} >
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
  route: ImmutablePropTypes.map.isRequried,
  stopKey: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequried,
  findDirection: PropTypes.func.isRequired,
  directionMap: ImmutablePropTypes.map.isRequired
}

const handleClick = curry((routeNumber, direction, stopKey, push, event) => {
  event.preventDefault()
  push(`/routeTimes/${routeNumber}/${direction}/${stopKey}`)
})

export default withProps(
  { handleClick, findDirection, directionMap }
)(RouteLink)
