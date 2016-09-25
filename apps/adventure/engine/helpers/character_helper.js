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
    const characterIds = characters.map((character) => character.id);
    const schemaCharacter = _.find(schema.lookupArray('character', characterIds), { name: name });
    if (!schemaCharacter) return;
    return Object.assign(schemaCharacter, _.find(characters, { id: schemaCharacter.id }));
  }
};
