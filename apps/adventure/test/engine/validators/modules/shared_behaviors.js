'use strict';

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

module.exports.validatorModule = (name, subject, object, opts) => {
  describe(`as validator module`, () => {
    it('should accumulate errors', () => {
      const msg = 'Ruh-roh!';
      object = object || ConfigurableModelFactory.default();
      expect(subject([msg], object, opts)).to.include(msg);
    });
  });
};
