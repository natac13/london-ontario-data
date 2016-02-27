import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'

import Input from 'react-toolbox/lib/input'

import {
  busStopsFilter
} from '../../js/core'

import style from './style'

class Search extends Component {
  constructor (props) {
    super(props)
    console.log(props.storage)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    const {
      stopIDMap,
      actions
    } = this.props
    const filteredMap = this.props.storage.get('filteredMap')

    if (filteredMap.size === 0) {
      actions.copy(stopIDMap)
    }

    if (filteredMap.size === 1) {

    }
  }

  componentWillUnmount () {

  }

  storeList (input) {
    const {
      stopIDMap,
      actions
    } = this.props
    actions.storeFilteredMap(busStopsFilter(stopIDMap, input))
  }

  handleChange (value) {
    this.storeList(value)
    this.props.fields.stopID.onChange(value)
  }

  render () {
    const baseUrl = 'http://www.ltconline.ca/webwatch/MobileAda.aspx?'
    // example r=01&d=1&s=598

    const {
      fields: { stopID },
      directionMap,
      className,
      stopIDMap
    } = this.props

    // create the filtered list.
    let stopsMap = busStopsFilter(stopIDMap, stopID.value)
    // stops is the full List which is rendered. Each stop has a List of route
    // Maps
    const stops = stopsMap.map((routes, stopKey) => {
      // routes is just the render components to place in the stopID <li> item
      routes = routes.sortBy((route) => route.get('route')).map((route) => {
        const routeNumber = route.get('route')
        const name = route.get('name')
        const direction = route.get('direction')
        return (
          <a
            href={`${baseUrl}r=${routeNumber}&d=${direction}&s=${stopKey}`}>
            <p
              key={routeNumber}
              className={style.route}>
              {routeNumber} - {name} heading {directionMap.get(direction)}
            </p>

          </a>
        )
      })
      return (
        <li
          key={stopKey}
          classNames={style.routeWrapper}>
          {routes}

        </li>
      )
    })
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
        <ul
          className={style.listWrapper}>
          {stops}

        </ul>

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
