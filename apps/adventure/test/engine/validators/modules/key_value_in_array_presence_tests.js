'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');
const IntentFactory = require('../../../factories/intent_factory');
const subject = require('../../../../engine/validators/modules/key_value_in_array_presence');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('keyValueInArrayPresence', () => {
  const shared = require('./shared_behaviors');
  const opts = { arrayKey: 'arrayKey', key: 'key', value: 'value' }
  shared.validatorModule('keyValueInArrayPresence', subject, undefined, opts);

  it('should throw an error when the arrayKey option is not specified', () => {
    const invoke = () => subject([], {}, { key: 'key', value: 'value' });
    expect(invoke).to.throw('The `keyValueInArrayPresence` validation requires an `arrayKey` option');
  });

  it('should throw an error when the key option is not specified', () => {
    const invoke = () => subject([], {}, { arrayKey: 'arrayKey', value: 'value' });
    expect(invoke).to.throw('The `keyValueInArrayPresence` validation requires a `key` option');
  });

  it('should throw an error when the value option is not specified', () => {
    const invoke = () => subject([], {}, { arrayKey: 'arrayKey', key: 'key' });
    expect(invoke).to.throw('The `keyValueInArrayPresence` validation requires a `value` option');
  });

  it('should not generate errors when the array includes an object with the correct key-value', () => {
    const object = ConfigurableModelFactory.default({ id: 'dummyId' });
    object.a = { b: { c: [{ easy: { as: '123' } }] } };
    expect(subject([], object, {
      arrayKey: 'a.b.c', key: 'easy.as', value: '123'
    })).to.deep.equal([]);
  });

  it('should generate errors when the array does not include an object with the correct key-value', () => {
    const object = ConfigurableModelFactory.default({ id: 'dummyId' });
    object.a = { b: { c: [{ easy: { as: 'do re mi' } }] } };
    expect(subject([], object, {
      arrayKey: 'a.b.c', key: 'easy.as', value: '123'
    })).to.include(
      'The value "123" was not found for key "easy.as" in array "a.b.c" of ConfigurableModel with id "dummyId"'
    );
  });
});
