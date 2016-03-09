import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../../actions'

import axios from 'axios'

import Header from '../../components/Header/'

import style from './style'

class App extends Component {
  componentDidMount () {
    const {
      actions,
      storage
    } = this.props

    const filteredMap = storage.get('filteredMap')

    actions.request()
    actions.createStopIDMap(axios.get('/api/all_stops'))
      .then(() => {
        if (!!filteredMap && filteredMap.size > 0) {
          actions.requestSuccess()
        } else {
          setTimeout(() => actions.requestSuccess(), 1000)
        }
      })
  }

  render () {
    const { actions, navBtn } = this.props

    const childrenWithStoreProps = React.Children.map(
      this.props.children,
      (child) => {
        return React.cloneElement(child, { ...this.props })
      })
    return (
      <div className={style.app}>
        <Header
          className={style.header}
          navOpen={actions.navOpen}
          navClose={actions.navClose}
          navBtn={navBtn} />
        {childrenWithStoreProps}
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object,
  storage: ImmutablePropTypes.map,
  getStopIDMap: PropTypes.func,
  navBtn: ImmutablePropTypes.map,
  children: PropTypes.node
}

//  Redux Connection
function mapStateToProps (state) {
  const stopIDMap = state.getIn(['initialData', 'stopIDMap'])
  const directionMap = state.getIn(['initialData', 'directionMap'])
  const storage = state.get('storage')
  const asyncState = state.get('asyncState')
  const navBtn = state.get('navBtn')
  return {
    stopIDMap,
    directionMap,
    storage,
    asyncState,
    navBtn
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
