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
const shared = require('./shared_behaviors');

/***********************************************/
/* Tests */
/***********************************************/

describe('Map', () => {
  shared.constructorAssignsProps(Map, [
    'characters',
    'connectedTo',
    'id',
    'introText',
    'items',
    'name',
    'searchText'
  ]);

  describe('.constructor', () => {
    it('should cast requirements', () => {
      expect(new Map({ requirements: undefined }).requirements).to.deep.eq([]);
      expect(new Map({ requirements: [] }).requirements).to.deep.eq([]);
      const map = new Map({
        requirements: [{
          item: { id: 'sword' }
        }]
      });
      expect(map.requirements[0].item.id).to.eq('sword');
      expect(map.requirements[0].constructor.name).to.eq('Requirement');
    });
  });
});
