'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const LanguageHelper = require('./language_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CharacterHelper {
  static getCharacterWithName(name, characters, schema) {
    return _.find(schema.lookupArray('character', characters), (character) => {
    	return LanguageHelper.areEqualish(name, character.name);
    });
  }
};
