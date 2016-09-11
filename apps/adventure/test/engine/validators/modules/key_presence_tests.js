"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');
const subject = require('../../../../engine/validators/modules/key_presence');

/***********************************************/
/* Tests */
/***********************************************/

describe('keyPresence', () => {
  const shared = require('./shared_behaviors');
  const opts = { key: 'whatevs' }
  shared.validatorModule('keyPresence', subject, undefined, opts);

  it('should throw an error when the key option is not specified', () => {
    const invoke = () => subject();
    expect(invoke).to.throw('The `keyPresence` validation requires a `key` option');
  });


  it('should not generate errors when key is present', () => {
    const object = ConfigurableModelFactory.default();
    object.somethingImportant = true;
    expect(subject([], object, { key: 'somethingImportant' })).to.deep.equal([]);
  });

  it('should generate errors when key is not present', () => {
    const object = ConfigurableModelFactory.default();
    expect(subject([], object, { key: 'somethingImportant' })).to.include(
      'The `somethingImportant` key must be present for ConfigurableModel with id "dummyId"'
    );
  });
});
