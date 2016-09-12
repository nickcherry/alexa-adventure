'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const CommandFactory = require('../../../factories/command_factory');
const IntentFactory = require('../../../factories/intent_factory');
const subject = require('../../../../engine/validators/modules/recognized_command');

/***********************************************/
/* Private */
/***********************************************/

const stubCommandClass = (object, getter) => {
  Object.defineProperty(object, 'commandClass', { get: getter });
};

/***********************************************/
/* Tests */
/***********************************************/

describe('recognizedCommand', () => {
  const shared = require('./shared_behaviors');
  shared.validatorModule('recognizedCommand', subject);

  it('should not generate errors when the command is recognized', () => {
    const object = IntentFactory.default();
    stubCommandClass(object, () => CommandFactory.default());
    expect(subject([], object)).to.deep.equal([]);
  });

  it('should generate errors when the command is not recognized', () => {
    const object = IntentFactory.default({ id: 'dummyId', command: 'nope' });
    stubCommandClass(object, () => undefined);
    expect(subject([], object)).to.include(
      '"nope" is not a recognized command for Intent with id "dummyId"'
    );
  });
});
