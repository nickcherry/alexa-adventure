"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Intent extends ConfigurableModel {
  constructor({ command, commandArgs, id}) {
    super();
    this.id = id;
    this.command = command;
    this.commandArgs = commandArgs;
  }

  get requiredProps() {
    return [
      'command',
      'id'
    ];
  }
}
