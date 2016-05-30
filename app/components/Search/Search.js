import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'
import Promise from 'bluebird'
import { withProps, compose } from 'recompose'
import { curry } from 'ramda'

// Components
import Input from 'react-toolbox/lib/input'
import { IconButton } from 'react-toolbox/lib/button'
import Icon from 'react-fa'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import StopsList from '../StopsList'

// helper functions
import { findStartingMap } from '../../js/core'

import style from './style.scss'

function Search (props) {
  const {
    fields: { stopID },
    handleSubmit,
    submitting,
    className,
    stopIDMap,
    storage,
    asyncState,
    error,
    actions,
    onSubmit
  } = props

  const filteredMap = storage.get('filteredMap')
  const finalStopMap = props.findStartingMap(stopIDMap, filteredMap)

  const wrapperClass = classnames({
    [style.wrapper]: true,
    [className]: !!className
  })

  return (
    <div className={wrapperClass}>
      <form
        role='form'
        onSubmit={handleSubmit(onSubmit(actions.storeFilteredMap, stopIDMap))}
        className={style.form}>
        <Input
          className={style.search}
          placeholder='Enter Stop ID Here'
          error={error}
          required
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
      <p className={style.instruction}>Click on a route to see the times</p>
      {asyncState.get('success')
      ? <StopsList
        actions={actions}
        stopsMap={finalStopMap} />
      : <ProgressBar type='circular' mode='indeterminate' />}
    </div>
  )
}

Search.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  stopIDMap: ImmutablePropTypes.map.isRequired,
  asyncState: ImmutablePropTypes.map.isRequired,
  className: PropTypes.string,
  storage: ImmutablePropTypes.map.isRequired,
  error: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  findStartingMap: PropTypes.func.isRequired
}

Search.defaultProps = {
  error: ''
}

const onSubmit = curry(function onSubmit (storeFilteredMap, stopIDMap, values) {
  return new Promise((resolve, reject) => {
    const { stopID } = values
    const action = storeFilteredMap({stopIDMap, stopID})
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
})

// wrapping the Search component in two Higher Order Components
// Redux-form and withProps from recompose
export default compose(
  reduxForm({
    form: 'searchStops',
    fields: ['stopID'],
    getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
  }),
  withProps({ onSubmit, findStartingMap })
)(Search)
