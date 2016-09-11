"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const proxyquire = require('proxyquire');

const Command = require('../../../../engine/commands/command');
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');

/***********************************************/
/* Private */
/***********************************************/

const subjectPath = '../../../../engine/validators/modules/required_slots';
const mockSubjectWithCommandLoader = (stub) => {
  stub = stub || new Function();
  return proxyquire(subjectPath, {
    '../../commands/command_loader': stub
  });
}

/***********************************************/
/* Tests */
/***********************************************/

describe('requiredSlots', () => {
  const subject = mockSubjectWithCommandLoader();
  const shared = require('./shared_behaviors');
  shared.validatorModule('requiredSlots', subject);

  it('should not generate errors when all required slots are present', () => {
    const object = ConfigurableModelFactory.default();
    const subject = mockSubjectWithCommandLoader({
      get: (command) => {
        if (command != 'drink') throw new Error('The command was not passed to CommandLoader');
        return class CommandWithRequiredSlots extends Command {
          static getRequiredSlots() {
            return ['beverage'];
          }
        }
      }
    });
    object.command = 'drink';
    object.slots = { beverage: 'beer' };
    expect(subject([], object)).to.deep.equal([]);
  });

  it('should generate errors when a required slot is not present', () => {
    const object = ConfigurableModelFactory.default();
    const subject = mockSubjectWithCommandLoader({
      get: (command) => {
        if (command != 'drink') throw new Error('The command was not passed to CommandLoader');
        return class CommandWithRequiredSlots extends Command {
          static getRequiredSlots() {
            return ['beverage'];
          }
        }
      }
    });
    object.command = 'drink';
    expect(subject([], object)).to.include(
      'The `beverage` slot is required for ConfigurableModel with id "Dummy ID"'
    )
  });
});
