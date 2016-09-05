"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;
const sinonChai = require("sinon-chai");
const stub = require('sinon').stub;

const AppFactory = require('../factories/app_factory');
const Game = require('../../engine/game');
const GameFactory = require('../factories/game_factory');
const ScriptFactory = require('../factories/script_factory');

/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;
chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('Game', () => {
  describe('.constructor', () => {
    it('should throw an error when an app and script are not provided', () => {
      const construct = () => new Game();
      expect(construct).to.throw(
        'The Game constructor requires at least two arguments: an alexa-app and a script'
      );
    });
  });
  describe('#init', () => {
    it('should define intents configured in the script', () => {
      const app = AppFactory.default();
      const script = ScriptFactory.fromFile('simple_script');
      const game = GameFactory.default({ app, script });
      const intentStub = stub(app, 'intent');
      game.init();
      expect(intentStub).to.have.been.calledThrice;
      expect(intentStub).to.have.been.calledWithMatch('new_game', script.intents[0]);
      expect(intentStub).to.have.been.calledWithMatch('walk', script.intents[1]);
      expect(intentStub).to.have.been.calledWithMatch('run', script.intents[2]);
    });
  });
  describe('#serialize', () => {
    it('should return a deserializable string', () => {
      const jsonString = GameFactory.default().serialize();
      const deserialized = JSON.parse(jsonString);
      expect(deserialized).to.be.an('object')
    });
  });
});
