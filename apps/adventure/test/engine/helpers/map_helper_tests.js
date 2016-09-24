'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const MapFactory = require('../../factories/map_factory');
const MapHelper = require('../../../engine/helpers/map_helper');
const SchemaFactory = require('../../factories/schema_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('MapHelper', () => {
  describe('.getCurrentMap', () => {
    it('should return undefined if the State has no mapId', () => {
      const state = { mapId: 'dungeon' };
      const schema = SchemaFactory.default();
      expect(MapHelper.getCurrentMap(state, schema)).to.be.undefined;
    });
    it('should return the map when the mapId is present', () => {
      const state = { mapId: 'dungeon' };
      const schema = SchemaFactory.default({
        maps: [MapFactory.default({ id: 'dungeon' })]
      });
      expect(MapHelper.getCurrentMap(state, schema).id).to.eq('dungeon');
    });
  });

  describe('.getConnectedMaps', () => {
    it('should return the maps connected to the map', () => {
      const map = MapFactory.default({
        connectedTo: ['ballroom', 'master bedroom']
      });
      const ballroom = MapFactory.default({ id: 'ballroom' });
      const corridor = MapFactory.default({ id: 'corridor' });
      const masterBedroom = MapFactory.default({ id: 'master bedroom' });
      const schema = SchemaFactory.default({ maps: [ ballroom, masterBedroom ] });
      expect(MapHelper.getConnectedMaps(map, schema)).to.deep.eq([ballroom, masterBedroom])
    });
  });

  describe('.getMapWithName', () => {
    it('should return undefined when no names match a connected map', () => {
      const map = MapFactory.default({
        connectedTo: ['ballroom', 'master bedroom']
      });
      const ballroom = MapFactory.default({ id: 'ballroom', name: 'The Ballroom' });
      const corridor = MapFactory.default({ id: 'corridor', name: 'A Dark Corridor' });
      const masterBedroom = MapFactory.default({ id: 'masterBedroom', name: 'Master Bedroom' });
      const schema = SchemaFactory.default({ maps: [ ballroom, masterBedroom ] });
      expect(MapHelper.getMapWithName('A Dark Corridor', map, schema)).to.be.undefined;
    });
    it('should return the correct map when the name matches a connected map', () => {
      const map = MapFactory.default({
        connectedTo: ['ballroom', 'masterBedroom']
      });
      const ballroom = MapFactory.default({ id: 'ballroom', name: 'The Ballroom' });
      const corridor = MapFactory.default({ id: 'corridor', name: 'A Dark Corridor' });
      const masterBedroom = MapFactory.default({ id: 'masterBedroom', name: 'Master Bedroom' });
      const schema = SchemaFactory.default({ maps: [ ballroom, masterBedroom ] });
      expect(MapHelper.getMapWithName('Master Bedroom', map, schema)).to.deep.eq(masterBedroom);
    });
  });

  describe('.getInitialMap', () => {
    it('should return the initial map', () => {
      const map = MapFactory.default({ id: 'tutorial' });
      const schema = SchemaFactory.default({
        initialMapId: map.id,
        maps: [map]
      })
      expect(MapHelper.getInitialMap(schema)).to.deep.eq(map);
    });
  });
});
