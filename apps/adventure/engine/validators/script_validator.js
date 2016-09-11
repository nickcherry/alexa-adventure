"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const CharacterValidator = require('./character_validator');
const IntentValidator = require('./intent_validator');
const ItemValidator = require('./item_validator');
const MapValidator = require('./map_validator');
const Validator = require('./validator');

const keyPresence = require('./modules/key_presence');
const nestedKeyUniqueness = require('./modules/nested_key_uniqueness');
const nestedArrayValidator = require('./modules/nested_array_validator');

/***********************************************/
/* Private */
/***********************************************/

const CHARACTERS_KEY = 'characters';
const INTENTS_KEY = 'intents';
const ID_KEY = 'id';
const ITEMS_KEY = 'items';
const MAPS_KEY = 'maps';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ScriptValidator extends Validator {
  get validators() {
    return [
      [keyPresence, { key: CHARACTERS_KEY }],
      [nestedKeyUniqueness, { key: CHARACTERS_KEY, nestedKey: ID_KEY }],
      [nestedArrayValidator, { key: CHARACTERS_KEY, validator: CharacterValidator }],

      [keyPresence, { key: INTENTS_KEY }],
      [nestedKeyUniqueness, { key: INTENTS_KEY, nestedKey: ID_KEY }],
      [nestedArrayValidator, { key: INTENTS_KEY, validator: IntentValidator }],

      [keyPresence, { key: ITEMS_KEY }],
      [nestedKeyUniqueness, { key: ITEMS_KEY, nestedKey: ID_KEY }],
      [nestedArrayValidator, { key: ITEMS_KEY, validator: ItemValidator }],

      [keyPresence, { key: MAPS_KEY }],
      [nestedKeyUniqueness, { key: MAPS_KEY, nestedKey: ID_KEY }],
      [nestedArrayValidator, { key: MAPS_KEY, validator: MapValidator }]
    ];
  }
}
