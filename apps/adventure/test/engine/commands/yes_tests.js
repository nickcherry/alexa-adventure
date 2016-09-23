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
const YesCommand = require('../../../engine/commands/yes');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('YesCommand', () => {
  describe('#perform', () => {
    it('should say the default yes text', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: YesCommand,
        res: res,
        intent: IntentFactory.default({
          commandArgs: {
            defaultText: 'Yes it is.'
          }
        })
      }).perform();
      expect(res.say).to.have.been.calledWithMatch(
        'Yes it is.'
      );
    });
  });
});
