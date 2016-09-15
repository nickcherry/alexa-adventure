'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const MapFactory = require('../../../factories/map_factory');
const SchemaFactory = require('../../../factories/schema_factory');
const subject = require('../../../../engine/validators/modules/recognized_map');

/***********************************************/
/* Tests */
/***********************************************/

describe('recognizedMap', () => {
  const shared = require('./shared_behaviors');
  shared.validatorModule('recognizedMap', subject, undefined, {
    key: 'initialMapId', schema: SchemaFactory.default()
  });

  it('should throw an error when the key option is not specified', () => {
    const invoke = () => subject([], undefined, { schema: {} });
    expect(invoke).to.throw('The `recognizedMap` validation requires a `key` option');
  });

  it('should throw an error when the schema option is not specified', () => {
    const invoke = () => subject([], undefined, { key: 'initialMapId' });
    expect(invoke).to.throw('The `recognizedMap` validation requires a `schema` option');
  });

  it('should not generate errors when the map is recognized', () => {
    const schema = SchemaFactory.default({
      initialMapId: 'dungeon',
      maps: [ MapFactory.default({ id: 'dungeon' })]
    });
    expect(subject([], schema, { key: 'initialMapId', schema: schema })).to.deep.equal([]);
  });

  it('should generate errors when the map is not recognized', () => {
    const schema = SchemaFactory.default({
      id: 'dummyId',
      initialMapId: 'dungeon'
    });
    expect(subject([], schema, { key: 'initialMapId', schema: schema })).to.include(
      '"dungeon" is not a recognized map for Schema with id "dummyId"'
    );
  });

  it('should generate errors when an item in an array of maps is not recognized', () => {
    const schema = SchemaFactory.default({
      maps: [ MapFactory.default({ id: 'dungeon' })]
    });
    const subjectMap = MapFactory.default({
      id: 'dummyMapId',
      connectedTo: ['dungeon', 'bathroom', 'closet']
    });
    expect(subject([], subjectMap, { key: 'connectedTo', schema: schema })).to.include.members([
      '"bathroom" is not a recognized map for Map with id "dummyMapId"',
      '"closet" is not a recognized map for Map with id "dummyMapId"'
    ]);
  });
});
