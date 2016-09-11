"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const proxyquire = require('proxyquire').noPreserveCache();

const Command = require('../../../engine/commands/command');
const ConfigurableModelFactory = require('../../factories/configurable_model_factory');

/***********************************************/
/* Tests / Exports */
/***********************************************/

module.exports.requiredProps = (validatorPath) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate required props`, () => {
    const object = ConfigurableModelFactory.default({
      requiredProps: ['somethingVeryImportant']
    });
    const validator = new validatorClass(object);
    expect(validator.errors).to.include(
      '`somethingVeryImportant` is a required property for ConfigurableModel with id "Dummy ID"'
    );
  });
};

module.exports.keyPresence = (validatorPath, { key }) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate key presence`, () => {
    const object = ConfigurableModelFactory.default();
    const validator = new validatorClass(object);
    delete object[key];
    expect(validator.errors).to.include(
      `The \`${ key }\` key must be present for ConfigurableModel with id "Dummy ID"`
    );
  });
};

module.exports.nestedArrayValidator = (validatorPath) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate nested array validations`, () => {
    const object = ConfigurableModelFactory.default();
    const validator = new validatorClass(object);
  });
};

module.exports.nestedKeyUniqueness = (validatorPath, { builder, key, nestedKey }) => {
  const validatorClass = require(validatorPath);
  xit(`${ validatorClass.name } should validate nested key uniqueness`, () => {
    const object = ConfigurableModelFactory.default();
    const validator = new validatorClass(object);
    const item1 = builder(), item2 = builder();
    item1[nestedKey] = item2[nestedKey] = 1
    object[key] = [item1, item2];
    expect(validator.errors).to.include(
      `The \`${ nestedKey }\` key of \`${ key }\` must be unique for ConfigurableModel with id "Dummy ID": "1" is not unique`
    );
  });
};

module.exports.recognizedCommand = (validatorPath) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate recognized command`, () => {
    const object = ConfigurableModelFactory.default();
    const validator = new validatorClass(object);
    object.command = 'na-na-na-na-na-na';
    expect(validator.errors).to.include(
      '"na-na-na-na-na-na" is not a recognized command for ConfigurableModel with id "Dummy ID"'
    );
  });
};

module.exports.requiredCommandArgs = (validatorPath) => {
  const validatorClass = require(validatorPath);
  xit(`${ validatorClass.name } should validate required command args`, () => {
  //   const object = ConfigurableModelFactory.default();
  //   const validator = new validatorClass(object);
  //   object.command = 'dance';
  //   expect(validator.errors).to.include(
  //     '`style` is a required property for ConfigurableModel with id "Dummy ID"'
  //   )
  });
};

module.exports.requiredProps = (validatorPath) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate required props`, () => {
    const object = ConfigurableModelFactory.default({
      requiredProps: ['somethingVeryImportant']
    });
    const validator = new validatorClass(object);
    expect(validator.errors).to.include(
      '`somethingVeryImportant` is a required property for ConfigurableModel with id "Dummy ID"'
    )
  });
};

module.exports.requiredSlots = (validatorPath) => {
  const validatorClass = require(validatorPath);
  xit(`${ validatorClass.name } should validate required slots`, () => {

  });
};
