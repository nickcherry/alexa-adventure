"use strict";

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
    it('should cast the models', () => {
      const script = ScriptFactory.fromFile('simple_script');
      const assertPresenceAndTypes = (key, type) => {
        const items = script[key];
        expect(items).to.have.length.of.at.least(1);
        items.forEach((item) => expect(item.constructor.name).to.eq(type));
      }
      assertPresenceAndTypes('characters', 'Character');
      assertPresenceAndTypes('intents', 'Intent');
      assertPresenceAndTypes('items', 'Item');
      assertPresenceAndTypes('maps', 'Map');
    });
  });
});
