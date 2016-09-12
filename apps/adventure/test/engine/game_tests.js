'use strict';

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
const SchemaFactory = require('../factories/schema_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('Game', () => {
  describe('.constructor', () => {
    it('should throw an error when any arguments are missing', () => {
      const construct = () => new Game();
      expect(construct).to.throw(
        'The Game constructor requires three arguments: an alexa-app, a schema, and a state manager'
      );
    });
  });

  describe('#init', () => {
    it('should define intents configured in the schema', () => {
      const app = AppFactory.default();
      const schema = SchemaFactory.fromFile('simple_schema');
      const game = GameFactory.default({ app, schema });
      const intentStub = stub(app, 'intent');
      game.init();
      expect(intentStub).to.have.been.calledThrice;
      expect(intentStub).to.have.been.calledWithMatch('new_game', schema.intentsAsArray[0]);
      expect(intentStub).to.have.been.calledWithMatch('walk', schema.intentsAsArray[1]);
      expect(intentStub).to.have.been.calledWithMatch('run', schema.intentsAsArray[2]);
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
