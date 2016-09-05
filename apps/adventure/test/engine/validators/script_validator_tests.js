"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const Script = require('../../../engine/script');
const ScriptFactory = require('../../factories/script_factory');
const ScriptValidator = require('../../../engine/validators/script_validator');

/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;

/***********************************************/
/* Tests */
/***********************************************/

describe('ScriptValidator', () => {

  describe('#isValid', () => {
    it('should return true when script is valid', () => {
      const script = ScriptFactory.fromFile('simple_script');
      const validator = new ScriptValidator(script);
      expect(validator.isValid()).to.be.true;
    });
    it('should return false when script is invalid', () => {
      const script = new Script();
      const validator = new ScriptValidator(script);
      expect(validator.isValid()).to.be.false;
    });
  });

  describe('#errors', () => {
    it('should return an empty array when the script is valid', () => {
      const script = ScriptFactory.fromFile('simple_script');
      const validator = new ScriptValidator(script);
      expect(validator.errors).to.deep.equal([]);
    });
    it('should return an array with errors when the script is invalid', () => {
      const script = new Script();
      const validator = new ScriptValidator(script);
      expect(validator.errors).to.have.length.above(0);
    });
  });

  describe('#_validateCharacters', () => {
    it('should generate error when characters key is not present', () => {
      const script = ScriptFactory.default({ characters: null });
      expect(new ScriptValidator(script).errors).to.deep.equal([
        "The characters array must be defined at the script's root."
      ]);
    });
  });

  describe('#_validateIntents', () => {
    it('should generate error when intents key is not present', () => {
      const script = ScriptFactory.default({ intents: null });
      expect(new ScriptValidator(script).errors).to.deep.equal([
        "The intents array must be defined at the script's root."
      ]);
    });
  });

  describe('#_validateItems', () => {
    it('should generate error when intents key is not present', () => {
      const script = ScriptFactory.default({ items: null });
      expect(new ScriptValidator(script).errors).to.deep.equal([
        "The items array must be defined at the script's root."
      ]);
    });
  });

  describe('#_validateMaps', () => {
    it('should generate error when maps key is not present', () => {
      const script = ScriptFactory.default({ maps: null });
      expect(new ScriptValidator(script).errors).to.deep.equal([
        "The maps array must be defined at the script's root."
      ]);
    });
  });
});
