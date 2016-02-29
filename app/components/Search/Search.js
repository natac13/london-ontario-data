import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'
import Promise from 'bluebird'

import Input from 'react-toolbox/lib/input'
import StopsList from '../StopsList'

import style from './style'

class Search extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  onSubmit (values, dispatch) {
    return new Promise((resolve, reject) => {
      const { stopID } = values
      const {
        stopIDMap,
        actions
      } = this.props
      const action = actions.storeFilteredMap({stopIDMap, stopID})
      setTimeout(() => {
        if (action.error) {
          const error = {
            _error: 'No StopID found.'
          }
          return reject(error)
        } else {
          return resolve()
        }
      }, 1000)
    })
  }

  render () {
    const {
      fields: { stopID },
      handleSubmit,
      directionMap,
      className,
      stopIDMap,
      error
    } = this.props

    const filteredMap = this.props.storage.get('filteredMap')
    // const finalMap = findStartingMap(stopIDMap, filteredMap, stopID.dirty)

    const wrapperClass = classnames({
      [style.wrapper]: true,
      [className]: !!className
    })
    console.log(this.props)

    return (
      <div className={wrapperClass}>
        <form
          role='form'
          className={style.form}>
          <Input
            className={style.search}
            placeholder='Enter Stop ID Here'
            error={error}
            name='searchStop'
            icon='search'
            type='text'
            { ...stopID } />
          <button type='submit' onClick={handleSubmit(this.onSubmit)}/>
        </form>
        <StopsList
          stopsMap={filteredMap || stopIDMap}
          directionMap={directionMap} />

      </div>
    )
  }
}

Search.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  actions: PropTypes.object,
  directionMap: ImmutablePropTypes.map,
  stopIDMap: ImmutablePropTypes.map,
  className: PropTypes.string,
  storage: ImmutablePropTypes.map,
  error: PropTypes.string
}

Search.defaultProps = {
  error: ''
}

export default reduxForm({
  form: 'searchStops',
  fields: ['stopID'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(Search)
