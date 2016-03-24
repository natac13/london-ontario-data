import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { take } from 'ramda'

import StopItem from '../StopItem'

import style from './style'

function StopsList (props) {
  const {
    stopsMap,
    actions
  } = props

  const stops = stopsMap.map((routes, stopKey) => {
    return (
      <StopItem
        key={stopKey}
        actions={actions}
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
  stopsMap: ImmutablePropTypes.map,
  actions: PropTypes.object
}

export default StopsList
