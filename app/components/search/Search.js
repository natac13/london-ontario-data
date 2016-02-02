import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'


class Search extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    render() {

        const { fields: { stopID } } = this.props;
        console.log(this.props);
        const stops = this.props.stopIDMap.map((routes, index) => {
            routes = routes.map((route, i) => {
                return (
                    <div key={i}>
                    <p> Name; {route.get('name')} </p>
                    <p> direction: {route.get('direction')} </p>
                    <p> routeNumber: {route.get('route')} </p>
                    </div>
                );
            });
            return (
                <li key={index} >
                    {routes}

                </li>
            );
        });

        return (
            <div >
                <input name="searchStop" type="text" { ...stopID } />
                <ul>
                {stops}

                </ul>

            </div>
        );
    }
}


export default reduxForm({
    form: 'searchStops',
    fields: ['stopID'],
    getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(Search);