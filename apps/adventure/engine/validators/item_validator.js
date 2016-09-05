"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Item = require('../item');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ItemValidator extends Validator {
  get errors() {
    if (!this._errors) {
      this._errors = this._validateRequiredProps();
    }
    return this._errors;
  }
}
