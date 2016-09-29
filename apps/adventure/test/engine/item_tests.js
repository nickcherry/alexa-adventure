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
      [{ item: { id: 'itemA' } }],
      [new Requirement({
        item: { id: 'itemA' }
      })]
    ]
  ]);

  describe('.constructor', () => {
    it('should cast requirements', () => {
      const item = new Item({
        requirements: [{
          item: { id: 'itemA' }
        }]
      });
      expect(item.requirements[0].constructor.name).to.eq('Requirement');
      expect(item.requirements).to.deep.eq([
        new Requirement({
          item: { id: 'itemA' }
        })
      ]);
    });
  });
});
