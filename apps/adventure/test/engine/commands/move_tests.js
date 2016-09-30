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
            ItemFactory.default({ id: 'key', name: 'the key' })
          ],
          maps: [
            MapFactory.default({
              id: 'startingRoom',
              name: 'the starting room',
              connectedTo: [
                { id: 'nearbyRoom' },
                { id: 'forbiddenRoom' },
                { id: 'normallyForbiddenRoom', requirements: [] },
                {
                  id: 'lockedRoom',
                  requirements: [
                    {
                      deniedText: 'looks like you need a key',
                      item: { 'id': 'key' },
                      preIntroText: 'this is the first that'
                    }
                  ]
                }
              ]
            }),
            MapFactory.default({
              id: 'nearbyRoom',
              name: 'the nearby room',
              introText: 'you are now entering the nearby room'
            }),
            MapFactory.default({
              id: 'lockedRoom',
              name: 'the locked room',
              introText: 'you are now entering the locked room'
            }),
            MapFactory.default({
              id: 'farAwayRoom',
              name: 'the far away room'
            }),
            MapFactory.default({
              id: 'forbiddenRoom',
              name: 'the forbidden room',
              requirements: [
                { item: { id: 'fakeItem' }, deniedText: 'this is forbidden' }
              ]
            }),
            MapFactory.default({
              id: 'normallyForbiddenRoom',
              name: 'the normally forbidden room',
              introText: 'you are now entering the normally forbidden room',
              requirements: [
                { item: { id: 'fakeItem' }, deniedText: 'THIS IS NORMALLY FORBIDDEN' }
              ]
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
          mapId: 'startingRoom',
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
          buildCommand('the nearby room', res, stateManager).perform();
          return promise.then(() => {
            expect(res.say).to.have.been.calledWithMatch(
              'you are now entering the nearby room'
            );
            expect(setState).to.have.been.calledWith(
              sinon.match((userId) => userId === 'TEST_USER'),
              sinon.match((state) => {
                return state.mapId === 'nearbyRoom' &&
                  _.isEqual(state.mapHistory, ['tutorial', 'startingRoom'])
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
          buildCommand('the locked room', res, stateManager, [{ id: 'key' }]).perform();
          return promise.then(() => {
            expect(res.say).to.have.been.calledWithMatch(
              'you are now entering the locked room'
            );
            expect(setState).to.have.been.calledWith(
              sinon.match((userId) => userId === 'TEST_USER'),
              sinon.match((state) => {
                return state.mapId === 'lockedRoom' &&
                  _.isEqual(state.mapHistory, ['tutorial', 'startingRoom'])
              })
            );
          });
        });
      });

      context('and base requirements are not satisfied, but override requirements are', () => {
        it('should move the player to the destination and update the history', () => {
          let promise;
          const res = { say: spy() };
          const stateManager = StateManagerFactory.default();
          const setState = stub(stateManager, 'setState', () => {
            return promise = Promise.resolve();
          });
          buildCommand('the normally forbidden room', res, stateManager).perform();
          return promise.then(() => {
            expect(res.say).to.have.been.calledWithMatch(
              'you are now entering the normally forbidden room'
            );
            expect(setState).to.have.been.calledWith(
              sinon.match((userId) => userId === 'TEST_USER'),
              sinon.match((state) => {
                return state.mapId === 'normallyForbiddenRoom' &&
                  _.isEqual(state.mapHistory, ['tutorial', 'startingRoom'])
              })
            );
          });
        });
      });

      context('and requirements are not satsified', () => {
        context('on the connectedTo map', () => {
          it('should say the connected to map requirement\'s denied text and not move the player', () => {
            const res = { say: spy() };
            const stateManager = StateManagerFactory.default();
            const setState = stateManager.setState = spy();
            buildCommand('the locked room', res, stateManager).perform();
            expect(res.say).to.have.been.calledWithMatch(
              "looks like you need a key"
            );
            expect(setState).to.have.callCount(0);
          });
        });

        context('on the base map', () => {
          it('should say the base map requirement\'s denied text and not move the player', () => {
            const res = { say: spy() };
            const stateManager = StateManagerFactory.default();
            const setState = stateManager.setState = spy();
            buildCommand('the forbidden room', res, stateManager).perform();
            expect(res.say).to.have.been.calledWithMatch(
              "this is forbidden"
            );
            expect(setState).to.have.callCount(0);
          });
        });
      });
    });

    context('when the destination is not connected to the current map', () => {
      it('should inform the player that the destination is inaccessible and not move the player', () => {
        let promise;
        const res = { say: spy() };
        const stateManager = StateManagerFactory.default();
        const setState = stub(stateManager, 'setState', () => {
          return promise = Promise.resolve();
        });
        buildCommand('the far away room', res, stateManager).perform();
        expect(res.say).to.have.been.calledWithMatch(
          "You can't get to the far away room from here"
        );
        expect(setState).to.have.callCount(0);
      });
    });
  });
});
