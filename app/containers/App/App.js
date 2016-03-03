import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../../actions'

import axios from 'axios'

import Search from '../../components/Search/'
import Header from '../../components/Header/'

import style from './style'

class App extends Component {
  componentWillMount () {
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
          setTimeout(() => actions.requestSuccess(), 500)
        }
      })
  }

  render () {
    return (
      <div className={style.app}>
        <Header className={style.header}/>
        <Search className={style.search} {...this.props} />

      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object,
  storage: ImmutablePropTypes.map,
  getStopIDMap: PropTypes.func
}

//  Redux Connection
function mapStateToProps (state) {
  const stopIDMap = state.getIn(['initialData', 'stopIDMap'])
  const directionMap = state.getIn(['initialData', 'directionMap'])
  const storage = state.get('storage')
  const asyncState = state.get('asyncState')
  return {
    stopIDMap,
    directionMap,
    storage,
    asyncState
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
