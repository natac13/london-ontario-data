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
    console.log(props)
  }

  componentDidMount () {
  }

  componentDidUpdate () {

  }

  render () {
    const baseUrl = 'http://www.ltconline.ca/webwatch/MobileAda.aspx?'
    // example r=01&d=1&s=598

    const {
      fields: { stopID },
      directionMap,
      className
    } = this.props
    let stopsMap = busStopsFilter(this.props.stopIDMap, stopID.value || '')
    const stops = stopsMap.map((routes, stopKey) => {
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
          { ...stopID } />
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
  directionMap: ImmutablePropTypes.map,
  stopIDMap: ImmutablePropTypes.map,
  className: PropTypes.string
}

export default reduxForm({
  form: 'searchStops',
  fields: ['stopID'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(Search)
