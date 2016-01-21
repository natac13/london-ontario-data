import { Map, List, fromJS } from 'immutable';
import R from 'ramda';

/**
 * Will return a hash map of the bus stops to a list of bus routes with the
 * route direction
 * Will take in json data which is a list of route object. Each route object has
 * properties 'stop', 'route', and 'direction'
 * Stop keys are numbers and not strings
 * @param  {array} data
 * @return {Immutable Map}
 */
export const createBusStopsMap = (data) => {
    return data.reduce((acc, obj) => {
        if (!acc.has(obj.stop)) {
            return acc.set(obj.stop, fromJS([{
                route: obj.route,
                direction: obj.direction
            }]));
        } else {
            return acc.update(obj.stop, (val) => {
                return val.push(Map({
                    route: obj.route,
                    direction: obj.direction
                }));
            });
        }

    }, Map());
};

/**
 * Given a number with return the length of how many digits.
 * @param [Number]
 * @return [Number]
 */
export const getNumberLength = R.compose(R.length, R.toString);


/**
 * busStopsFilter :: Map a -> Number b -> Map a
 * Will filter a busStopsMap down base on the userInput
 * Will compare the userInput to the busStop key from stopsMap. However the
 * busStop is cut down with R.take(userInput.length)
 * @param  {Map}    stopsMap
 * @param  {Number} userInput
 * @return {Map}
 */
export const busStopsFilter = R.curry((stopsMap, userInput) => {
    return stopsMap.filter((routeList, stop) => {
        const trimmedStopId = R.take(getNumberLength(userInput), R.toString(stop));
        return trimmedStopId === R.toString(userInput);
    });
});