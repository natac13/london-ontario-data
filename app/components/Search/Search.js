import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import Input from 'react-toolbox/lib/input';

import {
  busStopsFilter
} from '../../js/core';

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

      const baseUrl = 'http://www.ltconline.ca/webwatch/MobileAda.aspx?';
      //r=01&d=1&s=598

      const {
        fields: { stopID },
        directionMap
      } = this.props;
      let stopsMap = busStopsFilter(this.props.stopIDMap, stopID.value || '');
      const stops = stopsMap.map((routes, stopKey) => {

        routes = routes.sortBy((route) => route.get('route')).map(route => {
          const routeNumber = route.get('route');
          const name = route.get('name');
          const direction = route.get('direction');
          return (
            <a
              href={`${baseUrl}r=${routeNumber}&d=${direction}&s=${stopKey}`}>
              <p
                key={routeNumber}
                className={style.route}>
                {routeNumber} - {name} heading {directionMap.get(direction)}
              </p>

            </a>
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
        <div className={style.wrapper}>
          <Input
            className={style.search}
            label="Enter Stop ID here"
            name="searchStop"
            type="text"
            { ...stopID } />
          <div
            className={style.listWrapper}>
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