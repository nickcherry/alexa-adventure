'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const StateFactory = require('../factories/state_factory');

/***********************************************/
/* Tests */
/***********************************************/

describe('State', () => {
  describe('#mapHistory', () => {
    it('should return the map history', () => {
      const state = StateFactory.default({ mapHistory: ['tutorial', 'dungeon'] });
      expect(state.mapHistory).to.deep.eq(['tutorial', 'dungeon']);
    });
  });

  describe('#pushMapHistory', () => {
    it('should push the map id and return the new history', () => {
      const state = StateFactory.default({ mapHistory: ['tutorial'] });
      const expected = ['tutorial', 'dungeon'];
      expect(state.pushMapHistory('dungeon')).to.deep.eq(expected);
      expect(state.mapHistory).to.deep.eq(expected);
    });
  });

  describe('#popMapHistory', () =>{
    it('should return the most recent map id and update the history', () => {
      const state = StateFactory.default({ mapHistory: ['tutorial', 'dungeon'] });
      expect(state.popMapHistory()).to.eq('dungeon');
      expect(state.mapHistory).to.deep.eq(['tutorial']);
    });
  });
});
