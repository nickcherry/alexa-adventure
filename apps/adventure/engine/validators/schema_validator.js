'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const CharacterValidator = require('./character_validator');
const IntentValidator = require('./intent_validator');
const ItemValidator = require('./item_validator');
const MapValidator = require('./map_validator');
const Validator = require('./validator');

const commandPresence = require('./modules/command_presence');
const keyPresence = require('./modules/key_presence');
const nestedKeyUniqueness = require('./modules/nested_key_uniqueness');
const nestedHashValidator = require('./modules/nested_hash_validator');
const recognizedMap = require('./modules/recognized_map');

/***********************************************/
/* Private */
/***********************************************/

const CHARACTERS_KEY = 'characters';
const INTENTS_KEY = 'intents';
const ID_KEY = 'id';
const INITIAL_MAP_KEY = 'initialMapId';
const ITEMS_KEY = 'items';
const MAPS_KEY = 'maps';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class SchemaValidator extends Validator {
  get validators() {
    return [
      [commandPresence, { key: INTENTS_KEY, command: 'launch' }],

      [keyPresence, { key: INITIAL_MAP_KEY }],
      [recognizedMap, { key: INITIAL_MAP_KEY, schema: this.object }],

      [keyPresence, { key: CHARACTERS_KEY }],
      [nestedKeyUniqueness, { key: CHARACTERS_KEY, nestedKey: ID_KEY }],
      [nestedHashValidator, { key: CHARACTERS_KEY, validator: CharacterValidator }],

      [keyPresence, { key: INTENTS_KEY }],
      [nestedKeyUniqueness, { key: INTENTS_KEY, nestedKey: ID_KEY }],
      [nestedHashValidator, { key: INTENTS_KEY, validator: IntentValidator }],

      [keyPresence, { key: ITEMS_KEY }],
      [nestedKeyUniqueness, { key: ITEMS_KEY, nestedKey: ID_KEY }],
      [nestedHashValidator, { key: ITEMS_KEY, validator: ItemValidator }],

      [keyPresence, { key: MAPS_KEY }],
      [nestedKeyUniqueness, { key: MAPS_KEY, nestedKey: ID_KEY }],
      [nestedHashValidator, { key: MAPS_KEY, validator: MapValidator, opts: { schema: this.object } }]
    ];
  }
};
