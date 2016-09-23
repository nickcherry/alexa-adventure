'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;
const proxyquire = require('proxyquire');

const CommandFactory = require('../factories/command_factory');
const Intent = require('../../engine/intent');
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
  require('./shared_behaviors').constructorAssignsProps(Intent, [
    'command',
    'commandArgs',
    'id',
    'slots',
    'utterances'
  ]);

  describe('#commandClass', () => {
    it('should return undefined when the command is not recognized', () => {
      const intent = IntentFactory.default();
      expect(intent.commandClass).to.be.undefined;
    });
    it('should return a class when the command is recognized', () => {
      const intent = IntentFactory.default({ command: 'new_game' });
      expect(intent.commandClass.name).to.eq('NewGameCommand');
    });
  });
});
