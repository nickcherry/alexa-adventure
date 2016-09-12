'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const CharacterFactory = require('../../factories/character_factory');
const CharacterValidator = require('../../../engine/validators/character_validator');
const IntentFactory = require('../../factories/intent_factory');
const IntentValidator = require('../../../engine/validators/intent_validator');
const ItemFactory = require('../../factories/item_factory');
const ItemValidator = require('../../../engine/validators/item_validator');
const MapFactory = require('../../factories/map_factory');
const MapValidator = require('../../../engine/validators/map_validator');

/***********************************************/
/* Tests */
/***********************************************/

describe('SchemaValidator', () => {
  const shared = require('./shared_behaviors');
  const validatorPath = '../../../engine/validators/schema_validator';
  [
    {
      method: 'keyPresence',
      opts: { key: 'characters'}
    },
    {
      method: 'nestedKeyUniqueness',
      opts: {
        key: 'characters',
        nestedKey: 'id',
        builder: CharacterFactory.default
      }
    },
    {
      method: 'nestedArrayValidator',
      opts: { key: 'characters', validator: CharacterValidator }
    },

    /*************************************/

    {
      method: 'keyPresence',
      opts: { key: 'intents'}
    },
    {
      method: 'nestedKeyUniqueness',
      opts: {
        key: 'intents',
        nestedKey: 'id',
        builder: IntentFactory.default
      }
    },
    {
      method: 'nestedArrayValidator',
      opts: { key: 'intents', validator: IntentValidator }
    },

    /*************************************/

    {
      method: 'keyPresence',
      opts: { key: 'items'}
    },
    {
      method: 'nestedKeyUniqueness',
      opts: {
        key: 'items',
        nestedKey: 'id',
        builder: ItemFactory.default
      }
    },
    {
      method: 'nestedArrayValidator',
      opts: { key: 'items', validator: ItemValidator }
    },

    /*************************************/

    {
      method: 'keyPresence',
      opts: { key: 'maps'}
    },
    {
      method: 'nestedKeyUniqueness',
      opts: {
        key: 'maps',
        nestedKey: 'id',
        builder: MapFactory.default
      }
    },
    {
      method: 'nestedArrayValidator',
      opts: { key: 'maps', validator: MapValidator }
    }
  ].forEach((behavior) => {
    shared[behavior.method](validatorPath, behavior.opts);
  });
});
