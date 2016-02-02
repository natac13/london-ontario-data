import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions';

import axios from 'axios';

import Search from '../../components/search/Search';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gotData: false
        };
        axios.get('/api/all_stops')
            .then(data => {
                this.props.actions.createStopIDMap(data.data);
                this.setState({
                    gotData: true
                });
            });
    }

    render() {
        return (
            <div >
                HELLO LONDON! From component App
                {this.state.gotData ? <Search {...this.props} /> : 'just waiting' }

            </div>
        );
    }
}

/*========================================
=            Redux connection            =
========================================*/

function mapStateToProps(state) {
    const stopIDMap = state.getIn(['initialData', 'stopIDMap']);
    return {
        stopIDMap
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch),
        dispatch
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


/*=====  End of Redux connection  ======*/