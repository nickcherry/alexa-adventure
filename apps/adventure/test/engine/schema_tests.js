'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const chai = require('chai');
const expect = require('chai').expect;

const CharacterFactory = require('../factories/character_factory');
const SchemaFactory = require('../factories/schema_factory');

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

  describe('#intentsAsArray', () => {
    it('should properly convert intents hash to array', () => {
      const schema = SchemaFactory.fromFile('simple_schema');
      expect(schema.intentsAsArray).to.have.length.of.at.least(1);
      schema.intentsAsArray.forEach((intent) => {
        expect(schema.intents[intent.id]).to.deep.eq(intent);
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
    it('should return the appropriate value when valid type and id are provided', () => {
      const pikachu = CharacterFactory.default({ id: 'pikachu' });
      const schema = SchemaFactory.default({ characters: [pikachu] });
      expect(schema.lookup('character', 'pikachu')).to.deep.eq(pikachu);
    });
  });
});