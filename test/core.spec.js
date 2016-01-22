import { Map, List, fromJS } from 'immutable'
import { expect } from 'chai';

/*** functions to test ***/
import {
    busStopsFilter,
    createBusStopsMap
} from '../app/js/core';

/*** sample data ***/
/*
stops(keys) include
1506, 1509, 1514, 1524, 1816, 1819, 1821, 1854, 1856, 1989, 2193, 2269, 2423
 */
import data from '../app/resources/sample.json';

describe('Creating the stopsMap. Mapping bus stops to a list of {route direction} Immutable Map', () => {
    it('should return a Map of key stops with a list of direction route values as a Map', () => {
        const hashMap = createBusStopsMap(data);
        console.log(hashMap)
        expect(hashMap).to.be.instanceof(Map);
        expect(hashMap.has(1509)).to.be.true;
        expect(hashMap.get(1509)).to.be.instanceof(List);
        expect(hashMap.get(1509).size).to.equal(2)
    });
});


describe('stopsFilter', () => {

    it('should return a function when only giving the busStopsMap. This function is then waiting for the userInput', () => {
        const stopsMap = createBusStopsMap(data);
        const stopsFilterWithStopsMap = busStopsFilter(stopsMap);
        expect(typeof stopsFilterWithStopsMap).to.equal('function');
        // waiting on one argument.
        expect(stopsFilterWithStopsMap.length).to.equal(1);
    });

    it('should take in a stopsMap and a userInput to return a new stopsMap, which has been filtered based off userInput', () => {
        const stopsMap = createBusStopsMap(data);
        const userInput = 18;
        const filteredBusStops = busStopsFilter(stopsMap, userInput);
        expect(filteredBusStops).to.be.instanceof(Map);
        expect(filteredBusStops.has(1816)).to.be.true;
        expect(filteredBusStops.get(1816)).to.be.instanceof(List);
        expect(filteredBusStops.size).to.equal(5);
    });

    it('should take in a full stopID and return the one busStop routeList', () => {
        const stopsMap = createBusStopsMap(data);
        const userInput = 2423;
        const filteredBusStops = busStopsFilter(stopsMap, userInput);
        expect(filteredBusStops.has(2423)).to.be.true;
        expect(filteredBusStops.size).to.equal(1);
        expect(filteredBusStops.has(1509)).to.be.false;
    });
});