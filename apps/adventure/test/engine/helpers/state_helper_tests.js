'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const MapFactory = require('../../factories/map_factory');
const SchemaFactory = require('../../factories/schema_factory');
const StateFactory = require('../../factories/state_factory');
const StateHelper = require('../../../engine/helpers/state_helper');

/***********************************************/
/* Tests */
/***********************************************/

describe('StateHelper', () => {
  describe('.ensureCurrentMap', () => {
    context('when the current mapId is valid', () => {
      it('should return the current mapId and not modify the state', () => {
        const map =  MapFactory.default({ id: 'dungeon' });
        const schema = SchemaFactory.default({ maps: [map] });
        const state = StateFactory.default({ mapId: 'dungeon' });
        expect(StateHelper.ensureCurrentMap(state, schema)).to.deep.eq(map);
        expect(state.mapId).to.eq('dungeon');
        expect(state.mapHistory).to.deep.eq([]);
      });
    });

    context('when the current mapId is invalid', () => {
      context('and valid history maps exist', () => {
        it('should pop history items until reaching a valid one', () => {
          const tutorial = MapFactory.default({ id: 'tutorial' });
          const ballroom =  MapFactory.default({ id: 'ballroom' });
          const bathroom = MapFactory.default({ id: 'bathroom' });
          const schema = SchemaFactory.default({
            initialMapId: tutorial.id,
            maps: [tutorial, ballroom]
           });
          const state = StateFactory.default({
            mapId: 'nada',
            mapHistory: [tutorial.id, ballroom.id, bathroom.id]
          });
          expect(StateHelper.ensureCurrentMap(state, schema)).to.deep.eq(ballroom);
          expect(state.mapId).to.eq(ballroom.id);
          expect(state.mapHistory).to.deep.eq([tutorial.id]);
        });
      })
      context('and no valid history maps exist', () => {
        it('should set the current map to the initial map', () => {
          const tutorial = MapFactory.default({ id: 'tutorial' });
          const ballroom =  MapFactory.default({ id: 'ballroom' });
          const schema = SchemaFactory.default({
            initialMapId: tutorial.id,
            maps: [tutorial]
           });
          const state = StateFactory.default({
            mapId: 'nada',
            mapHistory: [ballroom.id]
          });
          expect(StateHelper.ensureCurrentMap(state, schema)).to.deep.eq(tutorial);
          console.log('AND HERE I AM', state.mapHistory, state._data.mapHistory);
          expect(state.mapId).to.eq(tutorial.id);
          expect(state.mapHistory).to.deep.eq([]);
        });
      });
    });
  });
});
