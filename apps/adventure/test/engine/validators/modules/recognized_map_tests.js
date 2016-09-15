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
    const object = SchemaFactory.default({
      initialMapId: 'dungeon',
      maps: [ MapFactory.default({ id: 'dungeon' })]
    });
    expect(subject([], object, { key: 'initialMapId', schema: object })).to.deep.equal([]);
  });

  it('should generate errors when the map is not recognized', () => {
    const object = SchemaFactory.default({
      id: 'dummyId',
      initialMapId: 'dungeon'
    });
    expect(subject([], object, { key: 'initialMapId', schema: object })).to.include(
      '"dungeon" is not a recognized map for Schema with id "dummyId"'
    );
  });
});
