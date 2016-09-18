'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const chai = require('chai');
const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const spy = require('sinon').spy;
const stub = require('sinon').stub;

const AppFactory = require('../factories/app_factory');
const Command = require('../../engine/commands/command');
const Game = require('../../engine/game');
const GameFactory = require('../factories/game_factory');
const IntentFactory = require('../factories/intent_factory');
const MapFactory = require('../factories/map_factory');
const RequestFactory = require('../factories/request_factory');
const ResponseFactory = require('../factories/response_factory');
const SchemaFactory = require('../factories/schema_factory');
const StateFactory = require('../factories/state_factory');
const StateManagerFactory = require('../factories/state_manager_factory');

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

  describe('#_perform', () => {
    it('should ensure the current map and perform the command', () => {
      const ensureCurrentMap = stub().returns(MapFactory.default({ id: 'dungeon' }));
      const GameClass = proxyquire('../../engine/game', {
        './helpers/state_helper': {
          ensureCurrentMap: ensureCurrentMap
        }
      });
      const app = AppFactory.default();
      const schema = SchemaFactory.default();
      const stateManager = StateManagerFactory.default();
      const game = new GameClass(app, schema, stateManager);
      const req = RequestFactory.default();
      const res = ResponseFactory.default();
      const intent = IntentFactory.default();
      const perform = stub();
      Object.defineProperty(intent, 'commandClass', {
         get: () => {
          const klass = class DummyCommand extends Command {};
          klass.prototype.perform = perform;
          return klass;
         }
      });
      const state = StateFactory.default();
      game._perform(req, res, intent, state);
      expect(ensureCurrentMap).to.have.callCount(1);
      expect(ensureCurrentMap).to.have.been.calledWith(state, schema);
      expect(perform).to.have.callCount(1);
    });

    it('should call the onError handler if anything goes wrong', () => {
      const onError = spy();
      const game = GameFactory.default({ onError });
      game._perform();
      expect(onError).to.have.callCount(1);
      expect(onError).to.have.been.calledWith(
        sinon.match((err) => {
          return new RegExp('Error').test(err.constructor.name);
        })
      );
    });
  });
});
