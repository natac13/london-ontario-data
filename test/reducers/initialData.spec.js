import { expect } from 'chai';
import { isFSA } from 'flux-standard-action';
import { Map, fromJS } from 'immutable';

import reducer from '../../app/reducers/initialData';

import {
  createStopIDMap
} from '../../app/actions/';

/*** sample data ***/
/*
stops(keys) include
25 total with 4 starting with 16
548, 408, 1771, 1769, 1644, 1481, 940
 */
import ltcData from '../../app/resources/sample.json';

describe('initialData reducer', () => {

  describe('Actions for reducer', () => {
    describe('createStopIDMap', () => {
      it('should return an FSA object with payload of the ltcData', () => {
        const action = createStopIDMap(ltcData);
        expect(isFSA(action)).to.be.true;
        expect(action.payload).to.be.ok;
        expect(action.payload).to.equal(ltcData);
      });
    });
  });
  describe('switch cases of reducer', () => {
    it('should handle CREATE_STOPID_MAP', () => {
      const action = createStopIDMap(ltcData)
      const state = Map();
      const nextState = reducer(state, action);
      expect(nextState).to.be.instanceof(Map);
      expect(nextState.has('stopIDMap')).to.be.true;
      expect(nextState.get('stopIDMap')).to.be.instanceof(Map);
      expect(nextState.hasIn(['stopIDMap', '1481'])).to.be.true;
      expect(nextState.getIn(['stopIDMap', '940']).size).to.equal(1);
    });

  });
});