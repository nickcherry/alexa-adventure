'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const spy = require('sinon').spy;
const stub = require('sinon').stub;

const Command = require('../../../engine/commands/command');
const CommandLoader = require('../../../engine/commands/command_loader');
const CommandFactory = require('../../factories/command_factory');
const GameFactory = require('../../factories/game_factory');
const IntentFactory = require('../../factories/intent_factory');
const RequestFactory = require('../../factories/request_factory');
const StateFactory = require('../../factories/state_factory');
const StateManagerFactory = require('../../factories/state_manager_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('Command', () => {
  describe('#getSlot', () => {
    context('when the slot exists', () => {
      it('should return the slot value', () => {
        const req = RequestFactory.default();
        stub(req, 'slot', (slot) => {
          if (slot === 'yep') return 'eureka'
        });
        const command = CommandFactory.default({ req });
        expect(command.getSlot('yep')).to.eq('eureka');
      });
    });
    context('when the slot does not exist', () => {
      it('should return undefined', () => {
        const req = RequestFactory.default();
        stub(req, 'slot', () => undefined);
        const command = CommandFactory.default({ req });
        expect(command.getSlot('nope')).to.be.undefined;
      });
    });
  });

  describe('#getCommandArg', () => {
    context('when the command arg exists', () => {
      it('should return the command arg', () => {
        const intent = IntentFactory.default({ commandArgs: { difficulty: 4 }});
        const command = CommandFactory.default({ commandClass: Command, intent });
        expect(command.getCommandArg('difficulty')).to.eq(4);
      });
      context('when the command arg does not exist', () => {
        it('should return undefined', () => {
          const command = CommandFactory.default({ commandClass: Command });
          expect(command.getCommandArg('difficulty')).to.be.undefined;
        });
      });
    });
  });

  describe('#setState', () => {
    context('when the state is undefined', () => {
      it('should throw an error', () => {
        const command = CommandFactory.default();
        const invoke = () => command.setState();
        expect(invoke).to.throw('State must be valid');
      });
    });

    context('when the state is a plain object', () => {
      it('should throw an error', () => {
        const command = CommandFactory.default();
        const invoke = () => command.setState({});
        expect(invoke).to.throw('State must be valid');
      });
    });

    context('when the state is valid', () => {
      it('should save the provided state for the request user', () => {
        const req = RequestFactory.default({ userId: 'Hodor' });
        const stateManager = StateManagerFactory.default();
        const setState = stub(stateManager, 'setState', () => Promise.resolve());
        const game = GameFactory.default({ stateManager: stateManager });
        const state = StateFactory.default();
        const command = CommandFactory.default({ game, req });
        command.setState(state);
        expect(setState).to.have.callCount(1);
        expect(setState).to.have.been.calledWithMatch('Hodor', state);
      });

      it('should invoke game.onError when save is rejected', () => {
        const onError = spy(() => Promise.reject());
        const stateManager = StateManagerFactory.default();
        const setState = stub(stateManager, 'setState', () => Promise.reject('oops'));
        const game = GameFactory.default({ onError, stateManager });
        const state = StateFactory.default();
        const command = CommandFactory.default({ game });
        return command.setState(state).catch(() => {
          expect(onError).to.have.callCount(1);
          expect(onError).to.have.been.calledWithMatch('oops');
        });
      });
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

  describe('#warn', () => {
    it('should call onError with context and warning severity', () => {
      const game = GameFactory.default();
      const onError = stub(game, 'onError');
      const command = CommandFactory.default({ game });
      const err = new Error('boop!');
      command.warn(err);
      expect(onError).to.have.been.calledWithMatch(err, {
        game: command.game,
        intent: command.intent,
        req: command.req,
        res: command.res,
        severity: 'warning',
        state: command.state
      });
    });
  });
});
