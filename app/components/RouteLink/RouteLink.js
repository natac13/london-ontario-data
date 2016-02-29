import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import findDirection from '../../js/findDirection'
import directionMap from '../../constants/directionMap'

import Icon from 'react-fa'

import style from './style'

function RouteLink (props) {
  const baseUrl = 'http://www.ltconline.ca/webwatch/MobileAda.aspx?'

  const {
    route,
    stopKey
  } = props

  const routeNumber = route.get('route')
  const name = route.get('name')
  const direction = route.get('direction')
  const display = findDirection(directionMap, direction)
  return (
    <a
      key={routeNumber}
      className={style.route}
      href={`${baseUrl}r=${routeNumber}&d=${direction}&s=${stopKey}`}>
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
  stopKey: PropTypes.string
}

export default RouteLink
