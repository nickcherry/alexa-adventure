"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Intent = require('../intent');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class IntentValidator extends Validator {
  get errors() {
    if (!this._errors) {
      this._errors = this._validateRequiredProps();
    }
    return this._errors;
  }
}
