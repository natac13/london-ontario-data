import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Icon from 'react-fa'
import RouteLink from '../RouteLink'

import style from './style'

const StopItem = (props) => {
  const {
    routes,
    stopKey
  } = props

  const routelist = routes.sortBy((route) => route.get('route')).map((route) => {
    return (
      <RouteLink
        route={route}
        stopKey={stopKey} />
    )
  })

  return (
    <li
      classNames={style.routeWrapper}>
      <p className={style.stopNumber}><Icon name='bus'/>Stop &#35;{stopKey} </p>
      {routelist}
    </li>
  )
}

StopItem.propTypes = {
  routes: ImmutablePropTypes.list,
  stopKey: PropTypes.string
}

export default StopItem
