'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');
const IntentFactory = require('../../../factories/intent_factory');
const subject = require('../../../../engine/validators/modules/key_value_presence');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('keyValuePresence', () => {
  const shared = require('./shared_behaviors');
  const opts = { key: 'intents', value: 'launch' }
  shared.validatorModule('keyValuePresence', subject, undefined, opts);

  it('should throw an error when the key option is not specified', () => {
    const invoke = () => subject([], {}, { value: 'launch' });
    expect(invoke).to.throw('The `keyValuePresence` validation requires a `key` option');
  });

  it('should throw an error when the value option is not specified', () => {
    const invoke = () => subject([], {}, { key: 'intents' });
    expect(invoke).to.throw('The `keyValuePresence` validation requires a `value` option');
  });

  it('should not generate errors when the key has the correct value', () => {
    const object = ConfigurableModelFactory.default({ id: 'dummyId' });
    object.a = { b: { c: 'Easy as 123'} };
    expect(subject([], object, { key: 'a.b.c', value: 'Easy as 123' })).to.deep.equal([]);
  });

  it('should generate errors when the key does not have the correct value', () => {
    const object = ConfigurableModelFactory.default({ id: 'dummyId' });
    object.a = { b: { c: 'Easy as do re mi'} };
    expect(subject([], object, { key: 'a.b.c', value: 'Easy as 123' })).to.include(
      '`Easy as 123` value was not found for "a.b.c" key of ConfigurableModel with id "dummyId"'
    );
  });
});
