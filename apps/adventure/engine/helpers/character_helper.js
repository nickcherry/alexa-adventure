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
    	const names = _.compact([character.name].concat(character.altNames));
    	return LanguageHelper.areEqualish(name, names);
    });
  }
};
