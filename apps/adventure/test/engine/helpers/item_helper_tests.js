'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const ItemFactory = require('../../factories/item_factory');
const ItemHelper = require('../../../engine/helpers/item_helper');
const SchemaFactory = require('../../factories/schema_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('ItemHelper', () => {
  describe('.getItemWithName', () => {
    it('should return undefined when none of the items match', () => {
      const schema = SchemaFactory.default();
      expect(ItemHelper.getItemWithName('Sword', [], schema)).to.be.undefined;
    });

    it('should return the correct item when it matches', () => {
      const flashlight = ItemFactory.default({ id: 'flashlight', name: 'Flashlight' });
      const ductTape = ItemFactory.default({ id: 'ductTape', name: 'Duct Tape' });
      const hammer = ItemFactory.default({ id: 'hammer', name: 'Hammer' });
      const schema = SchemaFactory.default({ items: [ ductTape, flashlight, hammer ] });
      expect(ItemHelper.getItemWithName(
        'Duct Tape', ['flashlight', 'ductTape', 'hammer'], schema
      )).to.deep.eq(ductTape);
    });
  });
});
