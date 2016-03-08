import React, { Component, PropTypes } from 'react'
import axios from 'axios'

import style from './style'

class RouteTimes extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    const {
      routeNumber,
      direction,
      stopID
    } = props.params
    axios.get(`/fetch/times/${routeNumber}/${direction}/${stopID}`)
    // on props.paras.query I will find the url to search.
  }

  render () {
    return (
      <div className={style.wrapper}>
        RouteTimes
      </div>
    )
  }
}

RouteTimes.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object
}

export default RouteTimes
