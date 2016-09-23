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
const StopCommand = require('../../../engine/commands/stop');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('StopCommand', () => {
  describe('#perform', () => {
    it('should say the default stop text', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: StopCommand,
        res: res,
        intent: IntentFactory.default({
          commandArgs: {
            defaultText: 'Stop we will.'
          }
        })
      }).perform();
      expect(res.say).to.have.been.calledWithMatch(
        'Stop we will.'
      );
    });
  });
});
