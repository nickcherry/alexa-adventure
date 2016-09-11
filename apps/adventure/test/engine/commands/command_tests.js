"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const stub = require('sinon').stub;

const CommandLoader = require('../../../engine/commands/command_loader');
const CommandFactory = require('../../factories/command_factory');
const RequestFactory = require('../../factories/request_factory');

/***********************************************/
/* Configuration */
/***********************************************/

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
  });

  describe('#requiredSlots', () => {
    it('should define the required slots', () => {
      CommandLoader.getAll().forEach((commandClass) => {
        expect(commandClass.getRequiredSlots()).to.be.a('array')
      });
    });
  });

  describe('#requiredCommandArgs', () => {
    it('should define the required command args', () => {
      CommandLoader.getAll().forEach((commandClass) => {
        expect(commandClass.getRequiredCommandArgs()).to.be.a('array');
      });
    });
  });
});
