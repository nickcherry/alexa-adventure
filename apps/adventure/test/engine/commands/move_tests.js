'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const spy = require('sinon').spy;
const stub = require('sinon').stub;

const CommandFactory = require('../../factories/command_factory');
const GameFactory = require('../../factories/game_factory');
const IntentFactory = require('../../factories/intent_factory');
const ItemFactory = require('../../factories/item_factory');
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
          items: [
            ItemFactory.default({ id: 'key', name: 'The Key' })
          ],
          maps: [
            MapFactory.default({
              id: 'ballroom',
              name: 'The Ballroom',
              connectedTo: [
                { id: 'masterBedroom', name: 'The Master Bedroom' },
                { id: 'bathroom', name: 'The Bathroom' },
                {
                  id: 'secretRoom',
                  name: 'A Secret Room',
                  requirements: [
                    {
                      deniedText: 'Looks like you need a key',
                      item: { 'id': 'key' }
                    }
                  ]
                },
                {
                  id: 'anotherSecretRoom',
                  preIntroText: 'This is the first that'
                }
              ]
            }),
            MapFactory.default({ id: 'masterBedroom', name: 'The Master Bedroom' }),
            MapFactory.default({ id: 'closet', name: 'The Closet' }),
            MapFactory.default({
              id: 'bathroom',
              name: 'The Bathroom',
              introText: 'You are now entering The Bathroom'
            }),
            MapFactory.default({
              id: 'secretRoom',
              name: 'A Secret Room',
              introText: 'You are now entering the secret room.'
            }),
            MapFactory.default({
              id: 'anotherSecretRoom',
              name: 'Another Secret Room',
              introText: "you're entering Another Secret Room"
            })
          ]
        }),
        stateManager: stateManager
      });
    };

    const buildCommand = (destination, res, stateManager, items) => {
      return CommandFactory.default({
        commandClass: MoveCommand,
        game: buildGame(stateManager),
        req: RequestFactory.default({
          slot: (slot) => slot === 'destination' ? destination : undefined
        }),
        res: res,
        state: StateFactory.default({
          items: items || [],
          mapId: 'ballroom',
          mapHistory: ['tutorial']
        })
      });
    };

    context('when the destination is connected to the current map', () => {
      context('and there are no requirements', () => {
        it('should move the player to the destination and update the history', () => {
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
              sinon.match((state) => {
                return state.mapId === 'bathroom' &&
                  _.isEqual(state.mapHistory, ['tutorial', 'ballroom'])
              })
            );
          });
        });
      });

      context('and requirements are satisfied', () => {
        it('should move the player to the destination and update the history', () => {
          let promise;
          const res = { say: spy() };
          const stateManager = StateManagerFactory.default();
          const setState = stub(stateManager, 'setState', () => {
            return promise = Promise.resolve();
          });
          buildCommand('A Secret Room', res, stateManager, [{ id: 'key' }]).perform();
          return promise.then(() => {
            expect(res.say).to.have.been.calledWithMatch(
              'You are now entering the secret room'
            );
            expect(setState).to.have.been.calledWith(
              sinon.match((userId) => userId === 'TEST_USER'),
              sinon.match((state) => {
                return state.mapId === 'secretRoom' &&
                  _.isEqual(state.mapHistory, ['tutorial', 'ballroom'])
              })
            );
          });
        });
      });

      context('and requirements are not satsified', () => {
        it('should say the denied text and not move the player', () => {
          const res = { say: spy() };
          const stateManager = StateManagerFactory.default();
          const setState = stateManager.setState = spy();
          buildCommand('A Secret Room', res, stateManager).perform();
          expect(res.say).to.have.been.calledWithMatch(
            "Looks like you need a key"
          );
          expect(setState).to.have.callCount(0);
        });
      });

      context('when the destination is not connected to the current map', () => {
        it.only('should inform the player that the destination is inaccessible and not change state', () => {
          let promise;
          const res = { say: spy() };
          const stateManager = StateManagerFactory.default();
          const setState = stub(stateManager, 'setState', () => {
            return promise = Promise.resolve();
          });
          buildCommand('Another Secret Room', res, stateManager).perform();
          expect(res.say).to.have.been.calledWithMatch(
            "This is the first that you're entering Another Secret Room"
          );
          expect(setState).to.have.callCount(1);
        });
      });

      context('and the destination has exit text', () => {
        it('should say the exit text before the next room\'s intro text', () => {
          const res = { say: spy() };
          const stateManager = StateManagerFactory.default();
          const setState = stateManager.setState = spy();
          buildCommand('A')
        });
      });
    });
  });
});
