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

const _validateUniqueness = (script, field, errors = []) => {
  const dups = _.uniq((script[field] || []).filter((array) => {
    return _.countBy(array, 'id') > 1;
  }));
  return errors.concat(dups.map((dup) => {
    return `The script's ${ scriptField } field contains multiple items with the ${ field } "${ field }".`;
  }));
  return errors;
};

const _validateKeyPresence = (script, field, errors = []) => {
  return script[field] ? errors : errors.concat([
    `The ${ field } array must be defined at the script's root.`
  ]);
}

const _validateNestedModel = (array, validatorClass, errors = []) => {
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
    errors = _validateKeyPresence(script, 'characters', errors);
    errors = _validateUniqueness(script, 'characters', errors);
    errors = _validateNestedModel(script.characters, CharacterValidator, errors);
    return errors;
  }

  _validateIntents(script, errors = []) {
    errors = _validateKeyPresence(script, 'intents', errors);
    errors = _validateUniqueness(script, 'intents', errors);
    errors = _validateNestedModel(script.intents, IntentValidator, errors);
    return errors;
  };

  _validateItems(script, errors = []) {
    errors = _validateKeyPresence(script, 'items', errors);
    errors = _validateUniqueness(script, 'items', errors);
    errors = _validateNestedModel(script.items, ItemValidator, errors);
    return errors;
  };

  _validateMaps(script, errors = []) {
    errors = _validateKeyPresence(script, 'maps', errors);
    errors = _validateUniqueness(script, 'maps', errors);
    errors = _validateNestedModel(script.maps, MapValidator, errors);
    return errors;
  }
}
