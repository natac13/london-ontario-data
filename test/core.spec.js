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
25 total with 4 starting with 16
548, 408, 1771, 1769, 1644, 1481, 940
 */
import data from '../app/resources/sample.json';

describe('Creating the stopsMap. Mapping bus stops to a list of {route direction} Immutable Map', () => {

    it('should return a Map of key stops with a list of direction route values as a Map', () => {
        const hashMap = createBusStopsMap(data);
        // console.log(JSON.stringify(hashMap, null, 4))
        expect(hashMap).to.be.instanceof(Map);
        expect(hashMap.has("1771")).to.be.true;
        expect(hashMap.get("1771")).to.be.instanceof(List);
        expect(hashMap.get("1771").size).to.equal(1)
    });
});


describe('busStopsFilter', () => {

    it('should return a function when only giving the busStopsMap. This function is then waiting for the userInput', () => {
        const stopsMap = createBusStopsMap(data);
        const stopsFilterWithStopsMap = busStopsFilter(stopsMap);
        expect(typeof stopsFilterWithStopsMap).to.equal('function');
        // waiting on one argument.
        expect(stopsFilterWithStopsMap.length).to.equal(1);
    });

    it('should take in a stopsMap and a userInput to return a new stopsMap, which has been filtered based off userInput', () => {
        const stopsMap = createBusStopsMap(data);
        const userInput = "16";
        const filteredBusStops = busStopsFilter(stopsMap, userInput);
        expect(filteredBusStops).to.be.instanceof(Map);
        expect(filteredBusStops.has("1644")).to.be.true;
        expect(filteredBusStops.get("1644")).to.be.instanceof(List);
        expect(filteredBusStops.size).to.equal(4);
    });

    it('should take in a full stopID and return the one busStop routeList', () => {
        const stopsMap = createBusStopsMap(data);
        const userInput = "1481";
        const filteredBusStops = busStopsFilter(stopsMap, userInput);
        expect(filteredBusStops.has("1481")).to.be.true;
        expect(filteredBusStops.size).to.equal(1);
        expect(filteredBusStops.has("548")).to.be.false;
    });

    it('should return the given stopIDMap if there is no user input', () => {
        const stopsMap = createBusStopsMap(data);
        const userInput = '';
        const filteredBusStops = busStopsFilter(stopsMap, userInput);
        expect(filteredBusStops).to.equal(stopsMap);
    })
});