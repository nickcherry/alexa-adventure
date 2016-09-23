'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinonChai = require("sinon-chai");
const spy = require('sinon').spy;

const CommandFactory = require('../../factories/command_factory');
const NoCommand = require('../../../engine/commands/no');
const IntentFactory = require('../../factories/intent_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('NoCommand', () => {
  describe('#perform', () => {
    it('should say the default no text', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: NoCommand,
        res: res,
        intent: IntentFactory.default({
          commandArgs: {
            defaultText: 'No it is.'
          }
        })
      }).perform();
      expect(res.say).to.have.been.calledWithMatch(
        'No it is.'
      );
    });
  });
});
