import { Map, List, fromJS } from 'immutable';

/**
 * Will return a hash map of the bus stops to a list of bus routes with the
 * route direction
 * Will take in json data which is a list of route object. Each route object has
 * properties 'stop', 'route', and 'direction'
 * @param  {array} data
 * @return {Immutable Map}
 */
export default function hashStopsRoutes (data) {
    data = data.reduce((acc, obj, index) => {
        if (!acc.has(obj.stop)) {
            acc = acc.set(obj.stop, fromJS([{route: obj.route, direction: obj.direction}]));
        } else {
            acc = acc.update(obj.stop, (val) => {
                return val.push(Map({route: obj.route, direction: obj.direction}))
            })
        }
        return acc

    }, Map());
    return data;
}