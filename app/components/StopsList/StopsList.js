import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import style from './style'

const StopsList = (props) => {
  const baseUrl = 'http://www.ltconline.ca/webwatch/MobileAda.aspx?'

  const {
    stopsMap,
    directionMap
  } = props

  const stops = stopsMap.map((routes, stopKey) => {
        // routes is just the render components to place in the stopID <li> item
    routes = routes.sortBy((route) => route.get('route')).map((route) => {
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
    })

    return (
      <li
        key={stopKey}
        classNames={style.routeWrapper}>
        {routes}

      </li>
    )
  })

  return (
    <ul className={style.listWrapper}>
     {stops}
    </ul>
  )
}

StopsList.propTypes = {
  stopsMap: ImmutablePropTypes.map,
  directionMap: ImmutablePropTypes.map
}

export default StopsList
