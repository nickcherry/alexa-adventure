'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const Command = require('../../../engine/commands/command');
const ConfigurableModelFactory = require('../../factories/configurable_model_factory');
const IntentFactory = require('../../factories/intent_factory');

/***********************************************/
/* Private */
/***********************************************/

const stubCommandClass = (object, getter) => {
  Object.defineProperty(object, 'commandClass', { get: getter });
};

/***********************************************/
/* Exports */
/***********************************************/

module.exports.requiredProps = (validatorPath) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate required props`, () => {
    const object = ConfigurableModelFactory.default({
      requiredProps: ['somethingVeryImportant']
    });
    const validator = new validatorClass(object);
    expect(validator.errors).to.include(
      '`somethingVeryImportant` is a required property for ConfigurableModel with id "dummyId"'
    );
  });
};

module.exports.keyPresence = (validatorPath, { key }) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate key presence (${ key })`, () => {
    const object = ConfigurableModelFactory.default();
    const validator = new validatorClass(object);
    delete object[key];
    expect(validator.errors).to.include(
      `The \`${ key }\` key must be present for ConfigurableModel with id "dummyId"`
    );
  });
};

module.exports.commandPresence = (validatorPath, { command, key }) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate the presence of command (\`${ command }\` on "${ key }")`, () => {
    const intent = IntentFactory.default({ id: 'dummyId' });
    const validator = new validatorClass(intent);
    expect(validator.errors).to.include(
      `\`${ command }\` command was not found for "${ key }" key of Intent with id "dummyId"`
    );
  });
};

module.exports.nestedHashValidator = (validatorPath) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate nested array validations`, () => {
    const object = ConfigurableModelFactory.default();
    const validator = new validatorClass(object);
  });
};

module.exports.nestedKeyUniqueness = (validatorPath, { builder, key, nestedKey }) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate nested key uniqueness (${ key }, ${ nestedKey })`, () => {
    const object = ConfigurableModelFactory.default();
    const validator = new validatorClass(object);
    const item1 = builder(), item2 = builder();
    item1[nestedKey] = item2[nestedKey] = 1
    object[key] = [item1, item2];
    expect(validator.errors).to.include(
      `The \`${ nestedKey }\` key of \`${ key }\` must be unique for ConfigurableModel with id "dummyId": "1" is not unique`
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
      '"na-na-na-na-na-na" is not a recognized command for ConfigurableModel with id "dummyId"'
    );
  });
};

module.exports.requiredCommandArgs = (validatorPath) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate required command args`, () => {
    const object = IntentFactory.default({ id: 'dummyId', command: 'dance' });
    stubCommandClass(object, () => {
      return class CommandWithRequiredArgs extends Command {
        static getRequiredCommandArgs() {
          return ['style'];
        }
        static getRequiredSlots() {
          return [];
        }
      }
    });
    const validator = new validatorClass(object);
    expect(validator.errors).to.include(
      'The `style` commandArg is required for Intent with id "dummyId"'
    );
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
      '`somethingVeryImportant` is a required property for ConfigurableModel with id "dummyId"'
    )
  });
};

module.exports.requiredSlots = (validatorPath) => {
  const validatorClass = require(validatorPath);
  it(`${ validatorClass.name } should validate required slots`, () => {
    const object = IntentFactory.default({ id: 'dummyId', command: 'dance' });
    stubCommandClass(object, () => {
      return class CommandWithRequiredArgs extends Command {
        static getRequiredSlots() {
          return ['style'];
        }
        static getRequiredCommandArgs() {
          return [];
        }
      }
    });
    const validator = new validatorClass(object);
    expect(validator.errors).to.include(
      'The `style` slot is required for Intent with id "dummyId"'
    )
  });
};
