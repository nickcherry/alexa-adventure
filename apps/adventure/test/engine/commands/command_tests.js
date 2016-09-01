"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const stub = require('sinon').stub;

const CommandFactory = require('../../factories/command_factory');
const RequestFactory = require('../../factories/request_factory');

/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;
chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('Command', () => {
  describe('#requireSlot', () => {
    describe('when the slot exists', () => {
      const req = RequestFactory.default();
      stub(req, 'slot', () => 'eureka');
      const command = CommandFactory.default({ req });
      expect(command._requireSlot('yep')).to.eq('eureka');
    });
    describe('when the slot does not exist', () => {
      const command = CommandFactory.default();
      const requirer = () => command._requireSlot('nope');
      expect(requirer).to.throw('expects a `nope` slot value.');
    });
  });
});
