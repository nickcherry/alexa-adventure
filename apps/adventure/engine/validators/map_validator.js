"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Map = require('../map');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MapValidator extends Validator {
  get errors() {
    if (!this._errors) {
      this._errors = this._validateRequiredProps();
    }
    return this._errors;
  }
}
