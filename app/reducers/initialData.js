import { Map } from 'immutable';

import {
  CREATE_STOPID_MAP
} from '../constants/';

import {
  createBusStopsMap
} from '../js/core';

const initialState = Map({
  stopIDMap: Map(),
  directionMap: Map({
    1: 'East',
    2: 'North',
    3: 'South',
    4: 'West'
  })
});

const initialData = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STOPID_MAP:
      return state.set('stopIDMap', createBusStopsMap(action.payload));
    default:
      return state;
  }
};

export default initialData;