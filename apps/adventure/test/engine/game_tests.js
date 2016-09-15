'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
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
      const launchStub = stub(app, 'launch');
      const intentStub = stub(app, 'intent');
      game.init();
      const intents = _.values(schema.intents);
      expect(launchStub).to.have.callCount(1);
      expect(intentStub).to.have.callCount(3);
      expect(intentStub).to.have.been.calledWithMatch('new_game', intents[1]);
      expect(intentStub).to.have.been.calledWithMatch('walk', intents[2]);
      expect(intentStub).to.have.been.calledWithMatch('run',intents[3]);
    });
  });
});
