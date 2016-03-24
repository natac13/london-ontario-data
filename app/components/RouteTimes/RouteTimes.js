import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classnames from 'classnames'

import style from './style.scss'

function RouteTimes (props) {
  const {
    lastUpdated,
    arrivalTimes,
    stopID
  } = props

  const wrapperClass = classnames({
    [style.wrapper]: true,
    [props.className]: !!props.className
  })
  const arrivalTimeComponents = arrivalTimes.map((arrival, index) => (
    <p className={style.arrivalTime} key={index}>
      Arriving @ <strong>{arrival.get('time')}</strong> to {arrival.get('destination')}
    </p>
  ))
  return (
    <section className={wrapperClass}>
      <h3 className={style.title}>
        Next 3 buses: stop #{stopID}
      </h3>
      <div className={style.arrivalTimes}>
       {arrivalTimeComponents}
      </div>
      <p className={style.lastUpdated}>
        Times last updated: <strong>{lastUpdated}</strong>
      </p>
    </section>
  )
}

RouteTimes.propTypes = {
  className: PropTypes.string,
  lastUpdated: PropTypes.string,
  arrivalTimes: ImmutablePropTypes.list,
  stopID: PropTypes.string
}

export default RouteTimes
