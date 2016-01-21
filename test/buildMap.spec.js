// import { Map, List, fromJS } from 'immutable';
// import { expect } from 'chai';
// import buildRouteStops from '../app/js/buildMap';

// import data from '../app/resources/sample.json';

// describe('building the map', () => {
//     it('should return a Map of key stops with a list of direction route values as a Map', () => {
//         const hashMap = buildRouteStops(data);
//         expect(hashMap).to.be.instanceof(Map);
//         expect(hashMap.has(1509)).to.be.true;
//         expect(hashMap.get(1509)).to.be.instanceof(List);
//         expect(hashMap.get(1509).size).to.equal(2)
//     });
// });