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
const IntentFactory = require('../../factories/intent_factory');
const GameFactory = require('../../factories/game_factory');
const ItemFactory = require('../../factories/item_factory');
const MapFactory = require('../../factories/map_factory');
const SchemaFactory = require('../../factories/schema_factory');
const PickUpCommand = require('../../../engine/commands/pick_up');
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

describe('PickUpCommand', () => {
  describe('#perform', () => {

    const sword = ItemFactory.default({ id: 'sword', name: 'Sword' });
    const boomerang = ItemFactory.default({ id: 'boomerang', name: 'Boomerang' });
    const plunger = ItemFactory.default({
      id: 'plunger',
      name: 'The Royal Plunger',
      pickUpText: 'You picked up The Royal Plunger. This will go great with your throne.'
     });

    const buildGame = (stateManager, onError) => {
      return GameFactory.default({
        onError: onError,
        schema: SchemaFactory.default({
          items: [sword, boomerang, plunger],
          maps: [
            MapFactory.default({
              id: 'ballroom',
              name: 'The Ballroom',
              items: [
                { id: 'sword' },
                { id: 'plunger' }
              ]
            })
          ]
        }),
        stateManager: stateManager
      });
    };

    const buildCommand = (item, res, stateManager, onError) => {
      return CommandFactory.default({
        commandClass: PickUpCommand,
        game: buildGame(stateManager, onError),
        req: RequestFactory.default({
          slot: (slot) => slot === 'item' ? item : undefined
        }),
        res: res,
        state: StateFactory.default({
          mapId: 'ballroom',
          items: [boomerang]
        })
      });
    };

    context('when the item is not in the current map', () => {
      it('should not add it to the inventory', () => {
        const res = { say: spy() };
        const onError = spy();
        const stateManager = StateManagerFactory.default();
        const setState = stateManager.setState = spy();
        buildCommand('The Longsword', res, stateManager, onError).perform();
        expect(res.say).to.have.been.calledWithMatch(
          "The Longsword was not found"
        );
        expect(setState).to.have.callCount(0);
        expect(onError).to.have.been.calledWithMatch(
          new Error('item not found: The Longsword')
        );
      });
    });

    context('when the item is valid and in the current map', () => {
      it('should add it to the inventory and read the pick-up text', () => {
        let promise;
        const res = { say: spy() };
        const stateManager = StateManagerFactory.default();
        const setState = stub(stateManager, 'setState', () => {
          return promise = Promise.resolve();
        });
        buildCommand('The Royal Plunger', res, stateManager).perform();
        return promise.then(() => {
          expect(res.say).to.have.been.calledWithMatch(
            'You picked up The Royal Plunger. This will go great with your throne.'
          );
          expect(setState).to.have.been.calledWith(
            sinon.match((userId) => userId === 'TEST_USER'),
            sinon.match((state) => {
              return _.isEqual(state.items, [boomerang, plunger]);
            })
          );
        });
      });
    });
  });
});
