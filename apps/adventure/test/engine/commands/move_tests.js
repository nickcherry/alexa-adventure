'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const spy = require('sinon').spy;
const stub = require('sinon').stub;

const CommandFactory = require('../../factories/command_factory');
const GameFactory = require('../../factories/game_factory');
const IntentFactory = require('../../factories/intent_factory');
const MapFactory = require('../../factories/map_factory');
const MoveCommand = require('../../../engine/commands/move');
const RequestFactory = require('../../factories/request_factory');
const SchemaFactory = require('../../factories/schema_factory');
const StateFactory = require('../../factories/state_factory');
const StateManagerFactory = require('../../factories/state_manager_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('MoveCommand', () => {
  describe('#perform', (destination) => {

    const buildGame = (stateManager) => {
      return GameFactory.default({
        schema: SchemaFactory.default({
          maps: [
            MapFactory.default({
              id: 'ballroom',
              name: 'The Ballroom',
              connectedTo: ['masterBedroom', 'bathroom']
            }),
            MapFactory.default({ id: 'masterBedroom', name: 'The Master Bedroom' }),
            MapFactory.default({ id: 'bathroom', name: 'The Bathroom' }),
            MapFactory.default({ id: 'closet', name: 'The Closet' })
          ]
        }),
        stateManager: stateManager
      });
    }

    const buildCommand = (destination, res, stateManager) => {
      return CommandFactory.default({
        commandClass: MoveCommand,
        game: buildGame(stateManager),
        req: RequestFactory.default({
          slot: (slot) => slot === 'destination' ? destination : undefined
        }),
        res: res,
        state: StateFactory.default({
          mapId: 'ballroom'
        })
      });
    }

    it('should move the player to the destination when it is connected to the current map', () => {
      let promise;
      const res = { say: spy() };
      const stateManager = StateManagerFactory.default();
      const setState = stub(stateManager, 'setState', () => {
        return promise = Promise.resolve();
      });
      buildCommand('The Bathroom', res, stateManager).perform();
      return promise.then(() => {
        expect(res.say).to.have.been.calledWithMatch(
          'You are now entering The Bathroom'
        );
        expect(setState).to.have.been.calledWith(
          sinon.match((userId) => userId === 'TEST_USER'),
          sinon.match((state) => state.mapId === 'bathroom')
        );
      });
    });

    it('should notify the player that the destination is inaccessible when it is not connected to the current map', () => {
      const res = { say: spy() };
      const stateManager = StateManagerFactory.default();
      const setState = stateManager.setState = spy();
      buildCommand('The Closet', res, stateManager).perform();
      expect(res.say).to.have.been.calledWithMatch(
        "You can't get to The Closet from here"
      );
      expect(setState).to.have.callCount(0);
    });
  });
});
