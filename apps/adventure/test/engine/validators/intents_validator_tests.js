"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const Command = require('../../../engine/commands/command');
const Intent = require('../../../engine/intent');
const IntentFactory = require('../../factories/intent_factory');
const IntentValidator = require('../../../engine/validators/intent_validator');

/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;

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
      const intent = IntentFactory.default({
        command: ''
      });
    });
    it('should generate error when required command arg is not present', () => {

    })
  });
});
