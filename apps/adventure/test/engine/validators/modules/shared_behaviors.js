"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const CommandFactory = require('../../../factories/command_factory');
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');

/***********************************************/
/* Tests / Exports */
/***********************************************/

module.exports.shouldBehaveLikeValidatorModule = (name, subject, object) => {
  describe(`${ name } as validator module`, () => {
    it('should accumulate errors', () => {
      const msg = 'Ruh-roh!';
      object = object || ConfigurableModelFactory.default();
      expect(subject([msg], object)).to.include(msg);
    });
  });
};
