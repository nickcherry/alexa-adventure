'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinonChai = require("sinon-chai");
const spy = require('sinon').spy;

const CommandFactory = require('../../factories/command_factory');
const IntentFactory = require('../../factories/intent_factory');
const SessionEndedCommand = require('../../../engine/commands/session_ended');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('SessionEndedCommand', () => {
  describe('#perform', () => {
    it('should say the goodbye text', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: SessionEndedCommand,
        res: res,
        intent: IntentFactory.default({
          commandArgs: {
            text: 'Toodles.'
          }
        })
      }).perform();
      expect(res.say).to.have.been.calledWithMatch('Toodles.');
    });
  });
});
