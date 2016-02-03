import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

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
        console.log(directionMap)
        const stops = this.props.stopIDMap.map((routes, index) => {
            routes = routes.map(route => {
                const routeNumber = route.get('route');
                const name = route.get('name');
                const direction = route.get('direction');
                return (
                    <p
                        key={routeNumber}
                        className={style.routeWrapper}>
                        {routeNumber} - {name} heading {directionMap.get(direction)}
                    </p>
                );
            });
            return (
                <div key={index}>
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