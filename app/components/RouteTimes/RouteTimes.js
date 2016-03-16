import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import axios from 'axios'

import ProgressBar from 'react-toolbox/lib/progress_bar'

import style from './style'

class RouteTimes extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    // on props.paras.query I will find the url to search.
  }

  componentWillMount () {
    const {
      routeNumber,
      direction,
      stopID
    } = this.props.params
    const { actions } = this.props
    actions.request()
    actions.routeTimeFetch(axios.get(`/fetch/times/${routeNumber}/${direction}/${stopID}`))
      .then(function fulfilled () {
        actions.requestSuccess()
      })
  }

  render () {
    const { asyncState } = this.props
    return (
      <div className={style.wrapper}>
        {asyncState.get('success')
        ? <p>Got route Times!</p>
        : <ProgressBar type='circular' mode='indeterminate' />}
      </div>
    )
  }
}

RouteTimes.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object,
  actions: PropTypes.object,
  asyncState: ImmutablePropTypes.map
}

export default RouteTimes
