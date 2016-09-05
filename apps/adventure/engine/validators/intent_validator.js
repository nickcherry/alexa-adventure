"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const CommandLoader = require('../commands/command_loader');
const Intent = require('../intent');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class IntentValidator extends Validator {
  get errors() {
    if (!this._errors) {
      this._errors = this._validateRequiredProps();
      this._errors = this._validateCommand(this._errors);
    }
    return this._errors;
  }

  _validateCommand(errors = []) {
    if (!CommandLoader.get(this.object.command)) {
      errors = errors.concat([
        `\`${ this.object.command }\` is not a recognized command for ${ this._objectIdentity }`
      ]);
    }
    return errors;
  }
}
