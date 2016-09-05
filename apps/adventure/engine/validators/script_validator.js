"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

const CharacterValidator = require('./character_validator');
const IntentValidator = require('./intent_validator');
const ItemValidator = require('./item_validator');
const MapValidator = require('./map_validator');
const Validator = require('./validator');

/***********************************************/
/* Private */
/***********************************************/

const concatDuplicateErrors = (script, field, errors = []) => {
  const dups = _.uniq((script[field] || []).filter((array) => {
    return _.countBy(array, 'id') > 1;
  }));
  return errors.concat(dups.map((dup) => {
    return `The script's ${ scriptField } field contains multiple items with the ${ field } "${ field }".`;
  }));
  return errors;
};

const concatKeyPresenceErrors = (script, field, errors = []) => {
  return script[field] ? errors : errors.concat([
    `The ${ field } array must be defined at the script's root.`
  ]);
}

const concatValidatorErrors = (array, validatorClass, errors = []) => {
  return (array || []).reduce((errors, item) => {
    return errors.concat(new validatorClass(item).errors);
  }, errors);
}

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ScriptValidator extends Validator {
  get errors() {
    if (!this._errors) {
      const script = this.object;
      this._errors = [
        this._validateCharacters,
        this._validateIntents,
        this._validateItems,
        this._validateMaps
      ].reduce((errors, func) => func(script, errors), []);
    }
    return this._errors;
  }

  _validateCharacters(script, errors = []) {
    errors = concatKeyPresenceErrors(script, 'characters', errors);
    errors = concatValidatorErrors(script.characters, CharacterValidator, errors);
    errors = concatDuplicateErrors(script, 'characters', errors);
    return errors;
  }

  _validateIntents(script, errors = []) {
    errors = concatKeyPresenceErrors(script, 'intents', errors);
    errors = concatValidatorErrors(script.intents, IntentValidator, errors);
    errors = concatDuplicateErrors(script, 'intents', errors);
    return errors;
  };

  _validateItems(script, errors = []) {
    errors = concatKeyPresenceErrors(script, 'items', errors);
    errors = concatValidatorErrors(script.items, ItemValidator, errors);
    errors = concatDuplicateErrors(script, 'items', errors);
    return errors;
  };

  _validateMaps(script, errors = []) {
    errors = concatKeyPresenceErrors(script, 'maps', errors);
    errors = concatValidatorErrors(script.maps, MapValidator, errors);
    errors = concatDuplicateErrors(script, 'maps', errors);
    return errors;
  }
}
