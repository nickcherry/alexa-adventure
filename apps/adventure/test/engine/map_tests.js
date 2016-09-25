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
    'introText',
    'items',
    'name',
    'searchText'
  ]);

  describe('.constructor', () => {
    it('should cast requirements', () => {
      expect(new Map({ requirements: undefined }).requirements).to.deep.eq([]);
      expect(new Map({ requirements: [] }).requirements).to.deep.eq([]);
      const map = new Map({ requirements: [{ itemId: 'sword' }] });
      expect(map.requirements[0].itemId).to.eq('sword');
      expect(map.requirements[0].constructor.name).to.eq('Requirement');
    });
  });
});
