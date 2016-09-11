"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const proxyquire = require('proxyquire');

const CommandFactory = require('../../../factories/command_factory');
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');

/***********************************************/
/* Private */
/***********************************************/

const subjectPath = '../../../../engine/validators/modules/recognized_command';
const mockSubjectWithCommandLoader = (stub) => {
  stub = stub || new Function();
  return proxyquire(subjectPath, {
    '../../commands/command_loader': stub
  });
}

/***********************************************/
/* Tests */
/***********************************************/

describe('recognizedCommand', () => {
  const subject = mockSubjectWithCommandLoader();
  const shared = require('./shared_behaviors');
  shared.validatorModule('recognizedCommand', subject);

  it('should not generate errors when the command is recognized', () => {
    const object = ConfigurableModelFactory.default();
    const subject = mockSubjectWithCommandLoader({
      get: () => CommandFactory.default()
    });
    expect(subject([], object)).to.deep.equal([]);
  });

  it('should generate errors when the command is not recognized', () => {
    const object = ConfigurableModelFactory.default();
    const subject = mockSubjectWithCommandLoader({
      get: () => undefined
    });
    object.command = 'nope';
    expect(subject([], object)).to.include(
      '"nope" is not a recognized command for ConfigurableModel with id "Dummy ID"'
    );
  });
});
