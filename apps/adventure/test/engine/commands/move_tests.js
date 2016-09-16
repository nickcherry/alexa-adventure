'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinonChai = require("sinon-chai");
const spy = require('sinon').spy;

const CommandFactory = require('../../factories/command_factory');
const GameFactory = require('../../factories/game_factory');
const IntentFactory = require('../../factories/intent_factory');
const MapFactory = require('../../factories/map_factory');
const MoveCommand = require('../../../engine/commands/move');
const SchemaFactory = require('../../factories/schema_factory');
const StateFactory = require('../../factories/state_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('MoveCommand', () => {
  describe('#perform', () => {
    it('should move the player to the destination when it is connected to the current map', () => {
      const res = { say: spy() };
      const state = StateFactory.default({ mapId: 'ballroom' });
      const game = GameFactory.default();
      game.stateManager.setState = spy();
      CommandFactory.default({
        commandClass: MoveCommand,
        intent: IntentFactory.default({
          slots: {
            destination: 'The Bathroom'
          }
        }),
        res: res,
        schema: SchemaFactory.default({
          maps: [
            MapFactory.default({
              id: 'ballroom',
              name: 'The Ballroom',
              connectedTo: ['masterBedroom', 'bathroom', 'closet']
            }),
            MapFactory.default({ id: 'masterBedroom', name: 'The Master Bedroom' }),
            MapFactory.default({ id: 'bathroom', name: 'The Bathroom' }),
            MapFactory.default({ id: 'closet', name: 'The Closet' })
          ]
        }),
        state: StateFactory.default({ mapId: 'ballroom' }),
      }).perform();
      expect(res.say).to.have.been.calledWithMatch(
        'You are now entering The Bathroom'
      );
    });
  });

  it('should notify the player that the destination is inaccessible when it is not connected to the current map', () => {

  });
});
