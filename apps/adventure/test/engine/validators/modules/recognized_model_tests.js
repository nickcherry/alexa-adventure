'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const MapFactory = require('../../../factories/map_factory');
const SchemaFactory = require('../../../factories/schema_factory');
const subject = require('../../../../engine/validators/modules/recognized_model');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('recognizedModel', () => {
  const shared = require('./shared_behaviors');
  shared.validatorModule('recognizedModel', subject, undefined, {
    type: 'map', key: 'initialMapId', schema: SchemaFactory.default()
  });

  it('should throw an error when the key option is not specified', () => {
    const invoke = () => subject([], undefined, { type: 'map', schema: {} });
    expect(invoke).to.throw('The `recognizedModel` validation requires a `key` option');
  });

  it('should throw an error when the schema option is not specified', () => {
    const invoke = () => subject([], undefined, { type: 'map', key: 'initialMapId' });
    expect(invoke).to.throw('The `recognizedModel` validation requires a `schema` option');
  });

  it('should throw an error when the type option is not specified', () => {
    const invoke = () => subject([], undefined, { key: 'initialMapId', schema: {} });
    expect(invoke).to.throw('The `recognizedModel` validation requires a `type` option');
  });

  it('should not generate errors when the model is recognized', () => {
    const schema = SchemaFactory.default({
      initialMapId: 'dungeon',
      maps: [ MapFactory.default({ id: 'dungeon' })]
    });
    expect(subject([], schema, { type: 'map', key: 'initialMapId', schema: schema })).to.deep.equal([]);
  });

  it('should generate errors when the model is not recognized', () => {
    const schema = SchemaFactory.default({ initialMapId: 'dungeon' });
    schema.id = 'dummyId';
    expect(subject([], schema, { type: 'map', key: 'initialMapId', schema: schema })).to.include(
      '"dungeon" is not a recognized map for Schema with id "dummyId"'
    );
  });
});
