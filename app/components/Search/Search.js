import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'
import Promise from 'bluebird'

import Input from 'react-toolbox/lib/input'
import { IconButton } from 'react-toolbox/lib/button'
import Icon from 'react-fa'
import ProgressBar from 'react-toolbox/lib/progress_bar'
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
      submitting,
      directionMap,
      className,
      stopIDMap,
      asyncState,
      error,
      actions
    } = this.props

    const filteredMap = this.props.storage.get('filteredMap')
    // const finalMap = findStartingMap(stopIDMap, filteredMap, stopID.dirty)

    const wrapperClass = classnames({
      [style.wrapper]: true,
      [className]: !!className
    })

    return (
      <div className={wrapperClass}>
        <form
          role='form'
          onSubmit={handleSubmit(this.onSubmit)}
          className={style.form}>
          <Input
            className={style.search}
            placeholder='Enter Stop ID Here'
            error={error}
            name='searchStop'
            type='text'
            { ...stopID } />
          <IconButton
            flat
            primary
            className={style.searchBtn}
            icon={<Icon name='search'/>}
            type='submit'
            disabled={submitting} />
        </form>
        {asyncState.get('success')
        ? <StopsList
          actions={actions}
          stopsMap={filteredMap || stopIDMap}
          directionMap={directionMap} />
        : <ProgressBar type='circular' mode='indeterminate' />}
      </div>
    )
  }
}

Search.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  actions: PropTypes.object,
  directionMap: ImmutablePropTypes.map,
  stopIDMap: ImmutablePropTypes.map,
  asyncState: ImmutablePropTypes.map,
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
