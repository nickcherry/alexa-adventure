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

const subjectPath = '../../../../engine/validators/modules/required_command_args';
const mockSubjectWithCommandLoader = (stub) => {
  stub = stub || new Function();
  return proxyquire(subjectPath, {
    '../../commands/command_loader': stub
  });
}

/***********************************************/
/* Tests */
/***********************************************/

describe('requiredCommandArgs', () => {

  before(() => {
    const subject = mockSubjectWithCommandLoader();
    const shared = require('./shared_behaviors');
    shared.shouldBehaveLikeValidatorModule('requiredCommandArgs', subject);
  });

  it('should not generate errors when all required command args are present', () => {
    const object = ConfigurableModelFactory.default();
    const subject = mockSubjectWithCommandLoader({
      get: () => {
        return class CommandWithRequiredArgs extends Command {
          static getRequiredCommandArgs() {
            return ['somethingImportant'];
          }
        }
      }
    });
    object.commandArgs = { somethingImportant: true };
    expect(subject([], object)).to.deep.equal([]);
  });

  it('should generate errors when a required command arg is not present', () => {
    const object = ConfigurableModelFactory.default();
    const subject = mockSubjectWithCommandLoader({
      get: () => {
        return class CommandWithRequiredArgs extends Command {
          static getRequiredCommandArgs() {
            return ['somethingImportant'];
          }
        }
      }
    });
    expect(subject([], object)).to.include(
      'The `somethingImportant` commandArg is required for ConfigurableModel with id "Dummy ID"'
    )
  });
});
