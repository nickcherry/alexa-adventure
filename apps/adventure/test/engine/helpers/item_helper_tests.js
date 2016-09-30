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

    it('should return the correct item when the name matches', () => {
      const flashlight = ItemFactory.default({ id: 'flashlight', name: 'Flashlight' });
      const ductTape = ItemFactory.default({ id: 'ductTape', name: 'Duct Tape' });
      const hammer = ItemFactory.default({ id: 'hammer', name: 'Hammer' });
      const schema = SchemaFactory.default({ items: [ductTape, flashlight, hammer] });
      expect(ItemHelper.getItemWithName(
        'Duct Tape', [
          { id: flashlight.id },
          { id: ductTape.id },
          { id: hammer.id }
        ], schema
      )).to.deep.eq(ductTape);
    });

    it('should return the correct item when any of the alt names match', () => {
      const flashlight = ItemFactory.default({ id: 'flashlight', name: 'Flashlight' });
      const ductTape = ItemFactory.default({
        id: 'ductTape', name: 'Duct Tape', aliases: ['The Greatest Stuff on Earth']
      });
      const hammer = ItemFactory.default({ id: 'hammer', name: 'Hammer' });
      const schema = SchemaFactory.default({ items: [ductTape, flashlight, hammer] });
      expect(ItemHelper.getItemWithName(
        'the greatest stuff   on earths', [flashlight, ductTape, hammer], schema
      )).to.deep.eq(ductTape);
    });

    it('should merge argument item attributes into schema item', () => {
      const schema = SchemaFactory.default({
        items: [ItemFactory.default({ id: 'hammer', name: 'Hammer' })]
      });
      const result = ItemHelper.getItemWithName(
        'Hammer', [{ id: 'hammer', isVisible: true }], schema
      );
      expect(result.name).to.eq('Hammer');
      expect(result.isVisible).to.be.true;
    });
  });
});
