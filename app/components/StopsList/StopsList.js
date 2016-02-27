import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import StopItem from '../StopItem'

import style from './style'

const StopsList = (props) => {
  const {
    stopsMap,
    directionMap
  } = props

  const stops = stopsMap.map((routes, stopKey) => {
    return (
      <StopItem
        key={stopKey}
        routes={routes}
        directionMap={directionMap}
        stopKey={stopKey} />
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
