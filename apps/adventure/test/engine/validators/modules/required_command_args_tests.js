"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const Command = require('../../../../engine/commands/command');
const IntentFactory = require('../../../factories/intent_factory');
const subject = require('../../../../engine/validators/modules/required_command_args');

/***********************************************/
/* Private */
/***********************************************/

const stubCommandClass = (object, getter) => {
  Object.defineProperty(object, 'commandClass', { get: getter });
};

/***********************************************/
/* Tests */
/***********************************************/

describe('requiredCommandArgs', () => {
  const shared = require('./shared_behaviors');
  shared.validatorModule('requiredCommandArgs', subject);

  it('should not generate errors when all required command args are present', () => {
    const object = IntentFactory.default();
    stubCommandClass(object, () => {
      return class CommandWithRequiredArgs extends Command {
        static getRequiredCommandArgs() {
          return ['beverage'];
        }
      }
    });
    object.commandArgs = { beverage: 'beer' };
    expect(subject([], object)).to.deep.equal([]);
  });

  it('should generate errors when a required command arg is not present', () => {
    const object = IntentFactory.default({ id: 'dummyId', command: 'drink' });
    stubCommandClass(object, () => {
      return class CommandWithRequiredArgs extends Command {
        static getRequiredCommandArgs() {
          return ['beverage'];
        }
      }
    });
    expect(subject([], object)).to.include(
      'The `beverage` commandArg is required for Intent with id "dummyId"'
    )
  });
});
