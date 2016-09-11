"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');
const subject = require('../../../../engine/validators/modules/nested_key_uniqueness');

/***********************************************/
/* Tests */
/***********************************************/

describe('nestedKeyUniqueness', () => {
  const shared = require('./shared_behaviors');
  const opts = { key: 'whatevs', nestedKey: 'nestedWhatevs' }
  shared.validatorModule('nestedKeyUniqueness', subject, undefined, opts);

  it('should throw an error when the key option is not specified', () => {
    const invoke = () => subject([], undefined, { nestedKey: 'nestedKey' });
    expect(invoke).to.throw('The `nestedKeyUniqueness` validation requires a `key` option');
  });

  it('should throw an error when the nestedKey option is not specified', () => {
    const invoke = () => subject([], undefined, { key: 'key' });
    expect(invoke).to.throw('The `nestedKeyUniqueness` validation requires a `nestedKey` option');
  });


  it('should not generate errors when keys are unique', () => {
    const object = ConfigurableModelFactory.default();
    object.array = [{ id: 1 }, { id: 2 }];
    expect(subject([], object, { key: 'array', nestedKey: 'id' })).to.deep.equal([]);
  });

  it('should generate errors when key is not unique', () => {
    const object = ConfigurableModelFactory.default();
    object.array = [{ id: 1 }, { id: 1 }];
    expect(subject([], object, { key: 'array', nestedKey: 'id' })).to.include(
      'The `id` key of `array` must be unique for ConfigurableModel with id "Dummy ID": "1" is not unique'
    );
  });
});
