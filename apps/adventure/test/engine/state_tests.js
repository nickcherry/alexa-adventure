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
  describe('#set mapId', () => {
    context('when a mapId is already assigned', () => {
      it('should set the mapId and push the previous mapId to the history', () => {
        const state = StateFactory.default({
          mapId: 'dungeon',
          mapHistory: ['tutorial']
        });
        state.mapId = 'ballroom';
        expect(state.mapId).to.eq('ballroom');
        expect(state.mapHistory).to.deep.eq(['tutorial', 'dungeon']);
      });
    });
    context('when no mapId is assigned', () => {
      it('should set the mapId', () => {
        const state = StateFactory.default();
        state.mapId = 'ballroom';
        expect(state.mapId).to.eq('ballroom');
        expect(state.mapHistory).to.deep.eq([]);
      });
    });
  });

  describe('#mapHistory', () => {
    it('should return the map history', () => {
      const state = StateFactory.default({ mapHistory: ['tutorial', 'dungeon'] });
      expect(state.mapHistory).to.deep.eq(['tutorial', 'dungeon']);
    });
  });

  describe('#goToPreviousMap', () => {
    context('when there is a history', () => {
      it('should pop the last history id and set it to mapId', () => {
        const state = StateFactory.default({
          mapId: 'ballroom',
          mapHistory: ['tutorial', 'dungeon']
        });
        expect(state.goToPreviousMap()).to.eq('dungeon');
        expect(state.mapId).to.eq('dungeon');
        expect(state.mapHistory).to.deep.eq(['tutorial']);
      });
    });
    context('when there is no history', () => {
      it('should set the mapId to undefined', () => {
        const state = StateFactory.default({ mapId: 'ballroom' });
        state.goToPreviousMap();
        expect(state.mapId).to.be.undefined;
        expect(state.mapHistory).to.deep.eq([]);
      });
    });
  });

  describe('#_pushMapHistory', () => {
    it('should push the map id and return the new history', () => {
      const state = StateFactory.default({ mapHistory: ['tutorial'] });
      const expected = ['tutorial', 'dungeon'];
      expect(state._pushMapHistory('dungeon')).to.deep.eq(expected);
      expect(state.mapHistory).to.deep.eq(expected);
    });
  });

  describe('#_popMapHistory', () => {
    it('should return the most recent map id and update the history', () => {
      const state = StateFactory.default({ mapHistory: ['tutorial', 'dungeon'] });
      expect(state._popMapHistory()).to.eq('dungeon');
      expect(state.mapHistory).to.deep.eq(['tutorial']);
    });
  });

  describe('#serialize', () => {
    it('should serialize the state', () => {
      const attrs = {
        inventory: [],
        mapHistory: ['tutorial', 'dungeon'],
        mapId: 'ballroom'
      };
      const state = StateFactory.default(attrs);
      expect(state.serialize()).to.eq(JSON.stringify(attrs));
    })
  });
});
