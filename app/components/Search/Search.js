import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'

import Input from 'react-toolbox/lib/input'
import StopsList from '../StopsList'

import {
  busStopsFilter
} from '../../js/core'

import style from './style'

class Search extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  handleChange (value) {
    const {
      stopIDMap,
      actions
    } = this.props
    actions.storeFilteredMap({stopIDMap, value})
    this.props.fields.stopID.onChange(value)
  }

  render () {
    const {
      fields: { stopID },
      directionMap,
      className,
      stopIDMap
    } = this.props

    const filteredMap = this.props.storage.get('filteredMap')

    const wrapperClass = classnames({
      [style.wrapper]: true,
      [className]: !!className
    })

    return (
      <div className={wrapperClass}>
        <Input
          className={style.search}
          placeholder='Enter Stop ID Here'
          name='searchStop'
          type='text'
          { ...stopID }
          onChange={this.handleChange} />
        <StopsList
          stopsMap={busStopsFilter(filteredMap || stopIDMap, stopID.value)}
          directionMap={directionMap} />

      </div>
    )
  }
}

Search.propTypes = {
  fields: PropTypes.object,
  actions: PropTypes.object,
  directionMap: ImmutablePropTypes.map,
  stopIDMap: ImmutablePropTypes.map,
  className: PropTypes.string,
  storage: ImmutablePropTypes.map
}

export default reduxForm({
  form: 'searchStops',
  fields: ['stopID'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(Search)
