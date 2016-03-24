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
      .then(
        function fulfilled () {
          if (!!filteredMap && filteredMap.size > 0) {
            actions.requestSuccess()
          } else {
            setTimeout(() => actions.requestSuccess(), 1000)
          }
        },
        function rejected (err) {
          // should better deal with no stopIDMap making it back from database
          console.log(err)
          actions.requestFail()
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
  getStopIDMap: PropTypes.func,
  children: PropTypes.node,
  storage: ImmutablePropTypes.map,
  navBtn: ImmutablePropTypes.map
}

//  Redux Connection
function mapStateToProps (state) {
  return {
    stopIDMap: state.getIn(['initialData', 'stopIDMap']),
    storage: state.get('storage'),
    asyncState: state.get('asyncState'),
    navBtn: state.get('navBtn'),
    routeTimes: state.get('routeTimes')
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
