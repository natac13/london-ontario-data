import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { busStopsFilter } from '../../js/core';

import style from './style';

class Search extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    render() {

        const {
            fields: { stopID },
            directionMap
        } = this.props;
        let stopsMap = busStopsFilter(this.props.stopIDMap, stopID.value || '');
        const stops = stopsMap.map((routes, stopKey) => {
            routes = routes.map(route => {
                const routeNumber = route.get('route');
                const name = route.get('name');
                const direction = route.get('direction');
                return (
                    <div >
                        <p> {stopKey} </p>
                        <p
                            key={routeNumber}
                            className={style.route}>
                            {routeNumber} - {name} heading {directionMap.get(direction)}
                        </p>

                    </div>
                );
            });
            return (
                <div
                    key={stopKey}
                    classNames={style.routeWrapper}>
                    {routes}

                </div>
            );
        });

        return (
            <div >
                <input name="searchStop" type="text" { ...stopID } />
                <div
                    className={style.wrapper}>
                {stops}

                </div>

            </div>
        );
    }
}


export default reduxForm({
    form: 'searchStops',
    fields: ['stopID'],
    getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(Search);