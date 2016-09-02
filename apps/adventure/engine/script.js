"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Private Functions */
/***********************************************/

const validateIntents = (data, errors) => {
  if (_.isArray(data.intents)) return errors;
  return errors.concat([
    "An intents array must be defined at the script's root."
  ]);
};

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Script {

  constructor(data = {}) {
    this._data = data;
  }

  get intents() {
    return this._data.intents;
  }

  isValid() {
    return !this.errors.length
  }

  get errors() {
    if (!this._errors) {
      const data = this._data;
      this._errors = [
        validateIntents
      ].reduce((errors, func) => func(data, errors), []);
    }
    return this._errors;
  }
}
