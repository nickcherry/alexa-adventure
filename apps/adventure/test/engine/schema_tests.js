'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const chai = require('chai');
const expect = require('chai').expect;

const CharacterFactory = require('../factories/character_factory');
const ItemFactory = require('../factories/item_factory');
const MapFactory = require('../factories/map_factory');
const SchemaFactory = require('../factories/schema_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('Schema', () => {
  describe('#getters', () => {
    it('should cast the non-intent models, hash by id, and cache properly', () => {
      const schema = SchemaFactory.fromFile('simple_schema');
      const assertPresenceAndTypes = (key, type) => {
        const items = schema[key];
        const keys = Object.keys(items);
        expect(keys).to.have.length.of.at.least(1);
        keys.forEach((key) => expect(items[key].constructor.name).to.eq(type));
      }
      _.times(2, () => {
        assertPresenceAndTypes('characters', 'Character');
        assertPresenceAndTypes('intents', 'Intent');
        assertPresenceAndTypes('items', 'Item');
        assertPresenceAndTypes('maps', 'Map');
      });
    });
  });

  describe('#lookup', () => {
    it('should return undefined when an invalid type is provided', () => {
      const schema = SchemaFactory.default({
        characters: [CharacterFactory.default({ id: 'pikachu' })]
      });
      expect(schema.lookup('xxx', 'pikachu')).to.be.undefined;
    });
    it('should return undefined when a non-existent id is provided', () => {
      const schema = SchemaFactory.default({
        characters: [CharacterFactory.default({ id: 'pikachu' })]
      });
      expect(schema.lookup('character', 'charizard')).to.be.undefined
    });
    it('should return the appropriate value when valid type and id string are provided', () => {
      const dungeon = MapFactory.default({ id: 'dungeon' });
      const pikachu = CharacterFactory.default({ id: 'pikachu' });
      const sword = ItemFactory.default({ id: 'sword' });
      const schema = SchemaFactory.default({
        characters: [pikachu],
        items: [sword],
        maps: [dungeon]
      });
      expect(schema.lookup('character', 'pikachu')).to.deep.eq(pikachu);
      expect(schema.lookup('item', 'sword')).to.deep.eq(sword);
      expect(schema.lookup('map', 'dungeon')).to.deep.eq(dungeon);
    });
    it('should return the schema object merged with the partial object when valid', () => {
      const pikachu = CharacterFactory.default({ id: 'pikachu', name: 'Pikachu', isMagic: true });
      const dungeon = MapFactory.default({ id: 'dungeon', name: 'Dungeon', difficulty: 3 });
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword', isMagic: false });
      const schema = SchemaFactory.default({
        characters: [pikachu],
        items: [sword],
        maps: [dungeon]
      });
      expect(schema.lookup('character', { id: 'pikachu' })).to.deep.eq({
        id: 'pikachu', name: 'Pikachu', isMagic: true
      });
      expect(schema.lookup('item', { id: 'sword', isMagic: true })).to.deep.eq({
        id: 'sword', name: 'Sword', isMagic: true, requirements: []
      });
      expect(schema.lookup('map', { id: 'dungeon', name: 'Darkest Dungeon', difficulty: 5 })).to.deep.eq({
        id: 'dungeon', name: 'Darkest Dungeon', difficulty: 5, requirements: []
      });
    });
  });

  describe('#lookupArray', () => {
    it('should look up an array of ids', () => {
      const charizard = CharacterFactory.default({ id: 'charizard' });
      const pikachu = CharacterFactory.default({ id: 'pikachu' });
      const schema = SchemaFactory.default({
        characters: [charizard, pikachu]
      });
      expect(schema.lookupArray('character', ['charizard', 'pikachu'])).to.deep.eq([
        charizard, pikachu
      ]);
    });
  });
});
