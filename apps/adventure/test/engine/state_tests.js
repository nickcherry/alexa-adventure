'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;
const timekeeper = require('timekeeper');

const ItemFactory = require('../factories/item_factory');
const StateFactory = require('../factories/state_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('State', () => {
  describe('#setMapId', () => {
    context('when no pushHistory argument is specified', () => {
      it('should throw an error', () => {
        const state = StateFactory.default();
        const invoke = () => state.setMapId('tutorial');
        expect(invoke).to.throw('The `pushHistory` argument is required for `setMapId`');
      });
    });
    context('when a mapId is already assigned', () => {
      context('and pushHistory is true', () => {
        it('should set the mapId and push the previous mapId to the history', () => {
          const state = StateFactory.default({
            mapId: 'dungeon',
            mapHistory: ['tutorial']
          });
          state.setMapId('ballroom', true);
          expect(state.mapId).to.eq('ballroom');
          expect(state.mapHistory).to.deep.eq(['tutorial', 'dungeon']);
        });
      });
      context('and pushHistory is false', () => {
        it('should set the mapId and not modify the mapHistory', () => {
          const state = StateFactory.default({
            mapId: 'dungeon',
            mapHistory: ['tutorial']
          });
          state.setMapId('ballroom', false);
          expect(state.mapId).to.eq('ballroom');
          expect(state.mapHistory).to.deep.eq(['tutorial']);
        });
      });
    });

    context('when no mapId is assigned', () => {
      it('should set the mapId', () => {
        const state = StateFactory.default();
        state.setMapId('ballroom', true);
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

  describe('#items', () => {
    it('should return the inventory items', () => {
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' });
      const boomerang = ItemFactory.default({ id: 'boomerang', name: 'Boomerang' });
      const state = StateFactory.default({ items: [sword, boomerang] });
      expect(state.items).to.deep.eq([sword, boomerang]);
    });
  });

  describe('#addItem', () => {
    it('should add the item to the inventory', () => {
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' });
      const boomerang = ItemFactory.default({ id: 'boomerang', name: 'Boomerang' });
      const state = StateFactory.default({ items: [sword] });
      expect(state.addItem(boomerang)).to.deep.eq([sword, boomerang])
      expect(state.items).to.deep.eq([sword, boomerang]);
    });
  });

  describe('#addItems', () => {
    it('should add the items to the inventory', () => {
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' });
      const boomerang = ItemFactory.default({ id: 'boomerang', name: 'Boomerang' });
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' });
      const state = StateFactory.default({ items: [sword] });
      expect(state.addItems([boomerang, plunger])).to.deep.eq([sword, boomerang, plunger])
      expect(state.items).to.deep.eq([sword, boomerang, plunger]);
    });
  });

  describe('#hasItemWithId', () => {
    it('should return true/false depending on whether the item exists in the inventory', () => {
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' });
      const state = StateFactory.default({ items: [sword] });
      expect(state.hasItemWithId('sword')).to.be.true;
      expect(state.hasItemWithId('slipper')).to.be.false;
    });
  });

  describe('#serialize', () => {
    it('should serialize the state and set a timestamp', () => {
      const time = new Date(2016, 8, 24);
      timekeeper.freeze(time);
      const attrs = {
        items: [],
        mapHistory: ['tutorial', 'dungeon'],
        mapId: 'ballroom',
        updatedAt: time.valueOf()
      };
      const state = StateFactory.default(attrs);
      expect(state.serialize()).to.eq(JSON.stringify(attrs));
    })
  });
});
