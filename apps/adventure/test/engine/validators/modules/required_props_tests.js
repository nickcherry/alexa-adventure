'use strict';

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
  const shared = require('./shared_behaviors');
  const object = ConfigurableModelFactory.default({ requiredProps: [] })
  shared.validatorModule('requiredProps', subject, object);

  it('should not generate errors when all required props are present', () => {
    const object = ConfigurableModelFactory.default({
      requiredProps: [
        'favoriteColor',
        ['favoriteNumber', 'Number'],
        ['favoriteFoods', 'Array']
      ]
    });
    object.favoriteColor = 'charcoal';
    object.favoriteNumber = 42;
    object.favoriteFoods = ['avocado', 'salmon', 'whiskey'];
    expect(subject([], object)).to.deep.equal([]);
  });

  it('should generate errors when a required prop is not present', () => {
    const object = ConfigurableModelFactory.default({
      requiredProps: [
        'favoriteColor'
      ]
    });
    expect(subject([], object)).to.include(
      '`favoriteColor` is a required property for ConfigurableModel with id "dummyId"'
    );
  });

  it('should generate errors when a required prop is not of the specified type', () => {
    const object = ConfigurableModelFactory.default({
      requiredProps: [
        ['favoriteNumber', 'Number'],
        ['favoriteFoods', 'Array']
      ]
    });
    object.favoriteNumber = '42';
    object.favoriteFoods = 'salmon';
    const errors = subject([], object);
    expect(errors).to.include(
      '`favoriteNumber` must be of type Number for ConfigurableModel with id "dummyId"'
    );
    expect(errors).to.include(
      '`favoriteFoods` must be of type Array for ConfigurableModel with id "dummyId"'
    );
  });
});
