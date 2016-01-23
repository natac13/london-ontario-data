import { expect } from 'chai';

import { capitalizeEachWord } from '../app/js/format';


describe('capitalizeEachWord of the named route.', () => {
    it('Should capitalize all the word in a string, regardless of special char', () => {
        const state = 'KIPPS LANE / THOMPSON ROAD';
        const nextState = capitalizeEachWord(state);
        expect(nextState).to.equal('Kipps Lane / Thompson Road');
    });

    it('should capitalize one word', () => {
        const state = 'DUNDAS';
        const nextState = capitalizeEachWord(state);
        expect(nextState).to.equal('Dundas');
    });

    it('should capitalize 2 word strings', () => {
        const state = 'HAMILTON ROAD';
        const nextState = capitalizeEachWord(state);
        expect(nextState).to.equal('Hamilton Road');
    });
});