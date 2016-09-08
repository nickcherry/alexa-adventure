"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

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
      this._errors = this._validateRequiredSlots(this._errors);
      this._errors = this._validateRequiredCommandArgs(this._errors);
    }
    return this._errors;
  }

  _getCommandClass() {
    return this._commandClass = this._commandClass || CommandLoader.get(this.object.command);
  }

  _validateCommand(errors = []) {
    if (!CommandLoader.get(this.object.command)) {
      errors = errors.concat([
        `\`${ this.object.command }\` is not a recognized command for ${ this._objectIdentity }`
      ]);
    }
    return errors;
  }

  _validateRequiredSlots(errors = []) {
    const commandClass = this._getCommandClass();
    if (commandClass) {
      commandClass.getRequiredSlots().forEach((slot) => {
        if (!_.includes(this.object.slots, slot)) {
          errors = errors.concat([
            `The \`${ slot }\` slot is required for ${ this._objectIdentity }`
          ]);
        }
      });
    }
    return errors;
  }

  _validateRequiredCommandArgs(errors = []) {
    const commandClass = this._getCommandClass();
    if (commandClass) {
      const object = this.object;
      commandClass.getRequiredCommandArgs().forEach((commandArg) => {
        if (!_.includes(object.commandArgs, commandArg)) {
          errors = errors.concat([
            `The \`${ commandArg }\` commandArg is required for ${ this._objectIdentity }`
          ]);
        }
      });
    }
    return errors;
  }
}
