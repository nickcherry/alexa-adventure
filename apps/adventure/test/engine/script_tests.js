'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const CharacterFactory = require('../factories/character_factory');
const ScriptFactory = require('../factories/script_factory');

/***********************************************/
/* Tests */
/***********************************************/

describe('Script', () => {
  describe('#getters', () => {
    it('should cast the non-intent models and hash by id', () => {
      const script = ScriptFactory.fromFile('simple_script');
      const assertPresenceAndTypes = (key, type) => {
        const items = script[key];
        const keys = Object.keys(items);
        expect(keys).to.have.length.of.at.least(1);
        keys.forEach((key) => expect(items[key].constructor.name).to.eq(type));
      }
      assertPresenceAndTypes('characters', 'Character');
      assertPresenceAndTypes('intents', 'Intent');
      assertPresenceAndTypes('items', 'Item');
      assertPresenceAndTypes('maps', 'Map');
    });
  });

  describe('#lookup', () => {
    it('should return undefined when an invalid type is provided', () => {
      const script = ScriptFactory.default({
        characters: [CharacterFactory.default({ id: 'pikachu' })]
      });
      expect(script.lookup('xxx', 'pikachu')).to.be.undefined;
    });
    it('should return undefined when a non-existent id is provided', () => {
      const script = ScriptFactory.default({
        characters: [CharacterFactory.default({ id: 'pikachu' })]
      });
      expect(script.lookup('character', 'charizard')).to.be.undefined
    });
    it('should return the appropriate value when valid type and id are provided', () => {
      const pikachu = CharacterFactory.default({ id: 'pikachu' });
      const script = ScriptFactory.default({ characters: [pikachu] });
      expect(script.lookup('character', 'pikachu')).to.deep.eq(pikachu);
    });
  });
});
