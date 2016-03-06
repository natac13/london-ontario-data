import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { take } from 'ramda'

import StopItem from '../StopItem'

import style from './style'

const StopsList = (props) => {
  const {
    stopsMap
  } = props

  const stops = stopsMap.map((routes, stopKey) => {
    return (
      <StopItem
        key={stopKey}
        routes={routes}
        stopKey={stopKey} />
    )
  })

  return (
    <ul className={style.listWrapper}>
     {take(40, stops)}
    </ul>
  )
}

StopsList.propTypes = {
  stopsMap: ImmutablePropTypes.map
}

export default StopsList
