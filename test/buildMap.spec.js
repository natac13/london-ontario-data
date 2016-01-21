import { Map, List, fromJS } from 'immutable';
import { expect } from 'chai';
import buildRouteStops from '../app/js/buildMap';

import data from '../app/resources/sample.json';

describe('building the map', () => {
    it('should return a Map of key stops with direction route pair for value', () => {
        const state = buildRouteStops(data);
        console.log(state);
        expect(state).to.be.instanceof(Map);
    });
});