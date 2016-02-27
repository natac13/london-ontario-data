import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import style from './style'

const RouteLink = (props) => {
  const baseUrl = 'http://www.ltconline.ca/webwatch/MobileAda.aspx?'

  const {
    route,
    directionMap,
    stopKey
  } = props

  const routeNumber = route.get('route')
  const name = route.get('name')
  const direction = route.get('direction')
  return (
    <a
      href={`${baseUrl}r=${routeNumber}&d=${direction}&s=${stopKey}`}>
      <p
        key={routeNumber}
        className={style.route}>
        {routeNumber} - {name} heading {directionMap.get(direction)}
      </p>
    </a>
  )
}

RouteLink.propTypes = {
  route: ImmutablePropTypes.map,
  directionMap: ImmutablePropTypes.map,
  stopKey: PropTypes.string
}

export default RouteLink
