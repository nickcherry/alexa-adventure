"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const Script = require('../../engine/script');

/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;

/***********************************************/
/* Tests */
/***********************************************/

describe('Script', () => {

  const getValidScript = () => {
    return new Script({
      "intents": []
    });
  };

  describe('#isValid', () => {
    it('should return true when script is valid', () => {
      expect(getValidScript().isValid()).to.be.true;
    });
    it('should return false when script is invalid', () => {
      expect(new Script().isValid()).to.be.false;
    });
  });

  describe('#errors', () => {
    it('should return an empty array when the script is valid', () => {
      expect(getValidScript().errors).to.deep.equal([]);
    });
  });
});
