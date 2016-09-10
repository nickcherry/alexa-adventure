"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');
const subject = require('../../../../engine/validators/modules/required_props');

/***********************************************/
/* Tests */
/***********************************************/

describe('requiredProps', () => {

  before(() => {
    const shared = require('./shared_behaviors');
    const object = ConfigurableModelFactory.default({ requiredProps: [] })
    shared.shouldBehaveLikeValidatorModule('requiredProps', subject, object);
  });

  it('should not generate errors when all required props are present', () => {
    const object = ConfigurableModelFactory.default({ requiredProps: ['somethingImportant'] });
    object.somethingImportant = true;
    expect(subject([], object)).to.deep.equal([]);
  });

  it('should generate errors when a required prop is not present', () => {
    const object = ConfigurableModelFactory.default({ requiredProps: ['somethingImportant'] });
    expect(subject([], object)).to.include(
      '`somethingImportant` is a required property for ConfigurableModel with id "Dummy ID"'
    );
  });
});
