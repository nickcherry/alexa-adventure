'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinonChai = require('sinon-chai');
const spy = require('sinon').spy;

const CommandFactory = require('../../factories/command_factory');
const ItemFactory = require('../../factories/item_factory');
const ListInventoryCommand = require('../../../engine/commands/list_inventory');
const StateFactory = require('../../factories/state_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('ListInventoryCommand', () => {
  describe('#perform', () => {
    context('when the inventory is empty', () => {
      it('should say the inventory is empty', () => {
        const res = { say: spy() };
        CommandFactory.default({
          commandClass: ListInventoryCommand,
          res: res,
        }).perform();
        expect(res.say).to.have.been.calledWithMatch(
          "There's nothing in your inventory"
        );
      });
    });
    context('when the inventory has no visible items', () => {
      it('should say the inventory is empty', () => {
        const res = { say: spy() };
        CommandFactory.default({
          commandClass: ListInventoryCommand,
          res: res,
          state: StateFactory.default({
            items: [
              { id: 'plunger', name: 'a plunger', isVisible: false },
              { id: 'axe', name: 'an axe', isVisible: false },
              { id: 'apple', name: 'an apple', isVisible: false },
              { id: 'hammer', name: 'a hammer', isVisible: false }
            ]
          })
        }).perform();
        expect(res.say).to.have.been.calledWithMatch(
          "There's nothing in your inventory"
        );
      });
    });
    context('when the inventory has items', () => {
      it('should list only the visible items', () => {
        const res = { say: spy() };
        CommandFactory.default({
          commandClass: ListInventoryCommand,
          res: res,
          state: StateFactory.default({
            items: [
              { id: 'plunger', name: 'a plunger', isVisible: false },
              { id: 'axe', name: 'an axe', isVisible: true },
              { id: 'apple', name: 'an apple', isVisible: true },
              { id: 'hammer', name: 'a hammer', isVisible: true }
            ]
          }),
        }).perform();
        expect(res.say).to.have.been.calledWithMatch(
          'You have an axe, an apple, and a hammer'
        );
      });
    });
  });
});
