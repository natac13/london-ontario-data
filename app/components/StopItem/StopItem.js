import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import RouteLink from '../RouteLink'

import style from './style'

const StopItem = (props) => {
  const {
    routes,
    directionMap,
    stopKey
  } = props

  const routelist = routes.sortBy((route) => route.get('route')).map((route) => {
    return (
      <RouteLink
        route={route}
        directionMap={directionMap}
        stopKey={stopKey} />
    )
  })

  return (
    <li
      classNames={style.routeWrapper}>
      {routelist}
    </li>
  )
}

StopItem.propTypes = {
  routes: ImmutablePropTypes.list,
  directionMap: ImmutablePropTypes.map,
  stopKey: PropTypes.string
}

export default StopItem
