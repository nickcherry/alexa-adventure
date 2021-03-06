'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinonChai = require('sinon-chai');
const spy = require('sinon').spy;

const CommandFactory = require('../../factories/command_factory');
const HelpCommand = require('../../../engine/commands/help');
const IntentFactory = require('../../factories/intent_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('HelpCommand', () => {
  describe('#perform', () => {
    it('should say the default help text', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: HelpCommand,
        res: res,
        intent: IntentFactory.default({
          commandArgs: {
            defaultText: 'Everything is going to be ok.'
          }
        })
      }).perform();
      expect(res.say).to.have.been.calledWithMatch(
        'Everything is going to be ok.'
      );
    });
  });
});
