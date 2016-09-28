'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CharacterHelper {
  static getCharacterWithName(name, characters, schema) {
    return _.find(schema.lookupArray('character', characters), { name: name });
  }
};
