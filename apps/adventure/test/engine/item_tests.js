'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const Item = require('../../engine/item');
const Requirement = require('../../engine/requirement');

/***********************************************/
/* Tests */
/***********************************************/

describe('Item', () => {
  require('./shared_behaviors').constructorAssignsProps(Item, [
    'id',
    'name',
    'isVisible',
    [
      'requirements',
      [{ itemId: 'itemA' }],
      [new Requirement({ itemId: 'itemA' })]
    ]
  ]);

  describe('.constructor', () => {
    it('should cast requirements', () => {
      const item = new Item({
        requirements: [{ itemId: 'itemA' }]
      });
      expect(item.requirements[0].constructor.name).to.eq('Requirement');
      expect(item.requirements).to.deep.eq([
        new Requirement({ itemId: 'itemA' })
      ]);
    });
  });
});
