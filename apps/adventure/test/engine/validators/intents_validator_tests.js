"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const stub = require('sinon').stub;

const Command = require('../../../engine/commands/command');
const Intent = require('../../../engine/intent');
const IntentFactory = require('../../factories/intent_factory');
const IntentValidator = require('../../../engine/validators/intent_validator');

/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;
chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('IntentValidator', () => {
  describe('#errors', () => {
    it('should generate error when command is invalid', () => {
      const intent = IntentFactory.default({ id: 'sirLimbless', command: 'juggle' });
      const validator = new IntentValidator(intent);
      expect(validator.errors).to.include(
        '`juggle` is not a recognized command for Intent with id sirLimbless'
      );
    });
    it('should generate error when required slot is not present', () => {
      class CommandWithRequiredSlot extends Command {
        static getRequiredSlots() {
          return ['LE_SLOT'];
        }
        static getRequiredCommandArgs() {
          return [];
        }
      }
      const intent = IntentFactory.default({ id: 'leIntent' });
      const validator = new IntentValidator(intent);
      validator._getCommandClass = () => CommandWithRequiredSlot;
      expect(validator.errors).to.include(
        'The `LE_SLOT` slot is required for Intent with id leIntent'
      );
    });
    it('should generate error when required command arg is not present', () => {
      class CommandWithRequiredArgs extends Command {
        static getRequiredSlots() {
          return [];
        }
        static getRequiredCommandArgs() {
          return ['leArg'];
        }
      }
      const intent = IntentFactory.default({ id: 'leIntent' });
      const validator = new IntentValidator(intent);
      validator._getCommandClass = () => CommandWithRequiredArgs;
      expect(validator.errors).to.include(
        'The `leArg` commandArg is required for Intent with id leIntent'
      )
    });
  });
});
