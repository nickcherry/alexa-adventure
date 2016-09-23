'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinonChai = require("sinon-chai");
const spy = require('sinon').spy;

const CommandFactory = require('../../factories/command_factory');
const CancelCommand = require('../../../engine/commands/cancel');
const IntentFactory = require('../../factories/intent_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('CancelCommand', () => {
  describe('#perform', () => {
    it('should say the default cancel text', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: CancelCommand,
        res: res,
        intent: IntentFactory.default({
          commandArgs: {
            defaultText: "Ok, I'll stop doing that."
          }
        })
      }).perform();
      expect(res.say).to.have.been.calledWithMatch(
        "Ok, I'll stop doing that."
      );
    });
  });
});
