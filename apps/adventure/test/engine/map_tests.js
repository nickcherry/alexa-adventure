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
    'connectedTo',
    'id',
    'name',
    [
      'characters',
      [{ id: 'pika', name: 'Pikachu' }],
      [new Character({ id: 'pika', name: 'Pikachu' })]
    ],
    [
      'items',
      [{ id: 'sword' }],
      [new Item({ id: 'sword' })]
    ],
    [
      'requirements',
      [{ itemId: 'itemA' }],
      [new Requirement({ itemId: 'itemA' })]
    ]
  ]);

  describe('.constructor', () => {
    it('should cast characters', () => {
      const map = new Map({
        characters: [{ id: 'bubba', name: 'Bubba' }]
      });
      expect(map.characters[0].constructor.name).to.eq('Character');
      expect(map.characters).to.deep.eq([
        new Character({ id: 'bubba', name: 'Bubba' })
      ]);
    });
    it('should cast items', () => {
      const map = new Map({
        items: [{ id: 'sword' }]
      });
      expect(map.items[0].constructor.name).to.eq('Item');
      expect(map.items).to.deep.eq([
        new Item({ id: 'sword' })
      ]);
    });
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
