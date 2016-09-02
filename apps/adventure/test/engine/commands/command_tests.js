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
  describe('#_slot', () => {
    describe('when the slot exists', () => {
      const req = RequestFactory.default();
      stub(req, 'slot', () => 'eureka');
      const command = CommandFactory.default({ req });
      expect(command._slot('yep')).to.eq('eureka');
    });
    describe('when a required slot does not exist', () => {
      const intent = { command: 'move' }
      const command = CommandFactory.default({ intent });
      const requirer = () => command._slot('DESTINATION');
      expect(requirer).to.throw('expects a `DESTINATION` slot value.');
    });
    describe('when an optional slot does not exist', () => {
      //
    });
  });
});
