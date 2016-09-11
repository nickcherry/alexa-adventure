"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const CommandLoader = require('../../../engine/commands/command_loader');
const NewGameCommand = require('../../../engine/commands/new_game');

/***********************************************/
/* Tests */
/***********************************************/

describe('CommandLoader', () => {
  describe('.constructor', () => {
    it('should throw an error', () => {
      const construct = () => new CommandLoader();
      expect(construct).to.throw('CommandLoader cannot be instantiated.')
    });
  });

  describe('.get', () => {
    describe('when the requested command is invalid', () => {
      it('should return undefined', () => {
        expect(CommandLoader.get('xxx')).to.be.undefined;
      });
    });

    describe('when the command is valid', () => {
      it('should return the requested command class', () => {
        expect(CommandLoader.get('new_game')).to.eq(NewGameCommand);
      });
    });
  });
});
