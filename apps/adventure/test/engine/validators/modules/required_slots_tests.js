'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const Command = require('../../../../engine/commands/command');
const IntentFactory = require('../../../factories/intent_factory');
const subject = require('../../../../engine/validators/modules/required_slots');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Private */
/***********************************************/

const stubCommandClass = (object, getter) => {
  Object.defineProperty(object, 'commandClass', { get: getter });
};

/***********************************************/
/* Tests */
/***********************************************/

describe('requiredSlots', () => {
  const shared = require('./shared_behaviors');
  shared.validatorModule('requiredSlots', subject);

  it('should not generate errors when all required slots are present', () => {
    const object = IntentFactory.default();
    stubCommandClass(object, () => {
      return class CommandWithRequiredSlots extends Command {
        static getRequiredSlots() {
          return ['beverage'];
        }
      }
    });
    object.slots = { beverage: 'beer' };
    expect(subject([], object)).to.deep.equal([]);
  });

  it('should generate errors when a required slot is not present', () => {
    const object = IntentFactory.default({ id: 'dummyId', command: 'drink' });
    stubCommandClass(object, () => {
      return class CommandWithRequiredSlots extends Command {
        static getRequiredSlots() {
          return ['beverage'];
        }
      }
    });
    expect(subject([], object)).to.include(
      'The `beverage` slot is required for Intent with id "dummyId"'
    );
  });
});
