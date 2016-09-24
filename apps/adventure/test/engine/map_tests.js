'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const Character = require('../../engine/character');
const Item = require('../../engine/item');
const Map = require('../../engine/map');
const Requirement = require('../../engine/requirement');

/***********************************************/
/* Tests */
/***********************************************/

describe('Map', () => {
  require('./shared_behaviors').constructorAssignsProps(Map, [
    'characters',
    'connectedTo',
    'id',
    'items',
    'name',
    'searchText',
    [
      'requirements',
      [{ itemId: 'itemA' }],
      [new Requirement({ itemId: 'itemA' })]
    ]
  ]);

  describe('.constructor', () => {
    it('should cast requirements', () => {
      const map = new Map({
        requirements: [{ itemId: 'itemA' }]
      });
      expect(map.requirements[0].constructor.name).to.eq('Requirement');
      expect(map.requirements).to.deep.eq([
        new Requirement({ itemId: 'itemA' })
      ]);
    });
  });
});
