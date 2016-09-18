'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const MapFactory = require('../../factories/map_factory');
const StateHelper = require('../../../engine/helpers/state_helper');
const SchemaFactory = require('../../factories/schema_factory');

/***********************************************/
/* Tests */
/***********************************************/

describe('StateHelper', () => {
  describe('.ensureCurrentMap', () => {
    it('should not modify the state when it has a valid map id', () => {
      const state = { mapId: 'dungeon' };
      const map =  MapFactory.default({ id: 'dungeon' });
      const schema = SchemaFactory.default({ maps: [map] });
      expect(StateHelper.ensureCurrentMap(state, schema)).to.deep.eq(map);
      expect(state.mapId).to.eq('dungeon');
    });

    it('should ', () => {

    });
  });
});
