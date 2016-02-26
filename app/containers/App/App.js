import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../../actions'

import axios from 'axios'

import Search from '../../components/Search/'
import Header from '../../components/Header/'

import style from './style'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gotData: false
    }
    axios.get('/api/all_stops')
      .then((data) => {
        this.props.actions.createStopIDMap(data.data)
        this.setState({
          gotData: true
        })
      })
  }

  render () {
    return (
      <div className={style.app}>
        <Header className={style.header}/>
        {this.state.gotData
          ? <Search
            {...this.props}
            className={style.search} />
          : 'just waiting'}

      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object,
  getStopIDMap: PropTypes.func
}

//  Redux Connection
function mapStateToProps (state) {
  const stopIDMap = state.getIn(['initialData', 'stopIDMap'])
  const directionMap = state.getIn(['initialData', 'directionMap'])
  return {
    stopIDMap,
    directionMap
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
