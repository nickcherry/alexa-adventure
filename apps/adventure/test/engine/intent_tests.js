'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;
const proxyquire = require('proxyquire');

const CommandFactory = require('../factories/command_factory');
const IntentFactory = require('../factories/intent_factory');

/***********************************************/
/* Private */
/***********************************************/

const getIntentWithCommandLoaderStub = (stub) => {
  return proxyquire('../../engine/intent', {
    './commands/command_loader': stub
  });
};

/***********************************************/
/* Tests */
/***********************************************/

describe('Intent', () => {
  describe('#commandClass', () => {
    it('should return undefined when the command is not recognized', () => {
      const intent = IntentFactory.default();
      expect(intent.commandClass).to.be.undefined;
    });
    xit('should return a class when the command is recognized', () => {
      const StubbedIntent = getIntentWithCommandLoaderStub(() => {
        get: () => CommandFactory.default()
      })
      const intent = new StubbedIntent();
      expect(intent.commandClass).to.be.a('object');
    });
  });
});
