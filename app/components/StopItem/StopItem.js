import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Icon from 'react-fa'
import RouteLink from '../RouteLink'

import style from './style.scss'

function StopItem (props) {
  const {
    routes,
    stopKey,
    actions
  } = props

  // taking the route and sorting by route number, I call toArray() as to
  // map over the collection to produce an array of components to render
  const routelist = routes.sortBy((route) => route.get('route')).toArray().map((route) => {
    return (
      <RouteLink
        key={route}
        actions={actions}
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
  stopKey: PropTypes.string,
  actions: PropTypes.object
}

export default StopItem
