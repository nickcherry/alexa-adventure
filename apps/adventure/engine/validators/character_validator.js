"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Character = require('../character');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CharacterValidator extends Validator {
  get errors() {
    if (!this._errors) {
      this._errors = this._validateRequiredProps();
    }
    return this._errors;
  }
}
