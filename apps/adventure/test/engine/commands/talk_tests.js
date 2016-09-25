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

const CharacterFactory = require('../../factories/character_factory');
const CommandFactory = require('../../factories/command_factory');
const GameFactory = require('../../factories/game_factory');
const ItemFactory = require('../../factories/item_factory');
const MapFactory = require('../../factories/map_factory');
const RequestFactory = require('../../factories/request_factory');
const SchemaFactory = require('../../factories/schema_factory');
const StateFactory = require('../../factories/state_factory');
const StateManagerFactory = require('../../factories/state_manager_factory');
const TalkCommand = require('../../../engine/commands/talk');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('TalkCommand', () => {
  describe('#perform', () => {

    const toto = ItemFactory.default({ id: 'toto', name: 'Toto' });
    const rubySlippers = ItemFactory.default({ id: 'rubySlippers', name: 'Ruby Slippers' });

    const buildGame = (stateManager) => {
      return GameFactory.default({
        schema: SchemaFactory.default({
          characters: [
            CharacterFactory.default({
              id: 'glinda',
              name: 'Glinda'
            }),
            CharacterFactory.default({
              id: 'tinMan',
              name: 'Tin Man'
            })
          ],
          items: [toto, rubySlippers],
          maps: [
            MapFactory.default({
              id: 'munchkinland',
              name: 'Munchkinland',
              characters: [
                {
                  id: 'glinda',
                  items: [{ id: 'rubySlippers' }],
                  responseText: 'Hello, darling'
                },
                {
                  id: 'tinMan',
                  responseText: 'I dropped my axe'
                }
              ]
            })
          ]
        }),
        stateManager: stateManager
      });
    };

    const buildCommand = (character, res, stateManager) => {
      return CommandFactory.default({
        commandClass: TalkCommand,
        game: buildGame(stateManager),
        req: RequestFactory.default({
          slot: (slot) => slot === 'character' ? character : undefined
        }),
        res: res,
        state: StateFactory.default({
          mapId: 'munchkinland',
          items: [toto]
        })
      });
    };

    context('to a character not in the current map', () => {
      it('should say that the character is not present', () => {
        const res = { say: spy() };
        buildCommand('Hodor', res).perform();
        expect(res.say).to.have.been.calledWithMatch(
          "Hodor isn't here"
        );
      });
    });

    context('to a character within the current map', () => {
      context('with no items', () => {
        it('should say the response text and not modify the inventory', () => {
          const res = { say: spy() };
          buildCommand('Tin Man', res).perform();
          expect(res.say).to.have.been.calledWithMatch(
            'I dropped my axe'
          );
        });
      });

      context('to a character with items', () => {
        it('should say the response text and add items to the inventory', () => {
          let promise;
          const res = { say: spy() };
          const stateManager = StateManagerFactory.default();
          const setState = stub(stateManager, 'setState', () => {
            return promise = Promise.resolve();
          });
          buildCommand('Glinda', res, stateManager).perform();
          return promise.then(() => {
            expect(res.say).to.have.been.calledWithMatch(
              "Hello, darling"
            );
            expect(setState).to.have.been.calledWith(
              sinon.match((userId) => userId === 'TEST_USER'),
              sinon.match((state) => {
                return _.isEqual(state.items, [toto, rubySlippers])
              })
            );
          });
        });
      });
    });
  });
});
