'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const MapFactory = require('../../../factories/map_factory');
const subject = require('../../../../engine/validators/modules/array_with_size');

/***********************************************/
/* Tests */
/***********************************************/

describe('arrayWithSize', () => {
  const shared = require('./shared_behaviors');
  const opts = { key: 'connectedTo' }
  shared.validatorModule('arrayWithSize', subject, undefined, opts);

  it('should throw an error when the key option is not specified', () => {
    const invoke = () => subject([], {});
    expect(invoke).to.throw('The `arrayWithSize` validation requires a `key` option');
  });

  it('should generate errors when the array is undefined', () => {
    const map = MapFactory.default({ id: 'dummyId' });
    expect(subject([], map, { key: 'connectedTo' })).to.include(
      'The "connectedTo" key is not an array with length in Map with id "dummyId"'
    );
  });

  it('should generate errors when the array is empty is undefined', () => {
    const map = MapFactory.default({ id: 'dummyId', connectedTo: [] });
    expect(subject([], map, { key: 'connectedTo' })).to.include(
      'The "connectedTo" key is not an array with length in Map with id "dummyId"'
    );
  });

  it('should not generate errors when the array contains an item', () => {
    const map = MapFactory.default({ id: 'dummyId', connectedTo: ['dungeon'] });
    expect(subject([], map, { key: 'connectedTo' })).to.deep.eq([]);
  });
});
