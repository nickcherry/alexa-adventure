'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');
const subject = require('../../../../engine/validators/modules/no_unrecognized_keys');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('noUnrecognizedKeys', () => {
  const shared = require('./shared_behaviors');
  const opts = { validKeys: ['id', 'name'] }
  shared.validatorModule('noUnrecognizedKeys', subject, undefined, opts);

  it('should throw an error when the validKeys option is not specified', () => {
    const invoke = () => subject();
    expect(invoke).to.throw('The `noUnrecognizedKeys` validation requires a `validKeys` option');
  });

  it('should not generate errors when no unrecognized keys are present', () => {
    const object = ConfigurableModelFactory.default({
      id: 'dummyId', name: 'Dummy Model'
    });
    object.yabadaba = 'doo';
    expect(subject([], object, { validKeys: ['id', 'name', 'yabadaba'] })).to.deep.equal([]);
  });

  it('should generate errors when unrecognized keys are present', () => {
    const object = ConfigurableModelFactory.default({
      id: 'dummyId',
      name: 'Dummy Model'
    });
    object.yabadaba = 'doo';
    expect(subject([], object, { validKeys: ['id', 'name'] })).to.deep.equal([
      '"yabadaba" is not a valid key for ConfigurableModel with id "dummyId"'
    ]);
  });
});
