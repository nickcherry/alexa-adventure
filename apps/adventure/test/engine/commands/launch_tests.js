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
const LaunchCommand = require('../../../engine/commands/launch');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('LaunchCommand', () => {
  describe('#perform', () => {
    it('should say the launch text', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: LaunchCommand,
        res: res,
        intent: IntentFactory.default({
          commandArgs: {
            text: 'Welcome!'
          }
        })
      }).perform();
      expect(res.say).to.have.been.calledWithMatch('Welcome!');
    });
  });
});
