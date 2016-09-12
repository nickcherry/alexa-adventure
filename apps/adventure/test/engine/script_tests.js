'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

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
});
