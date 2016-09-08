"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Intent extends ConfigurableModel {
  constructor({ command, commandArgs, id, slots, utterances }) {
    super();
    this.id = id;
    this.command = command;
    this.commandArgs = commandArgs;
    this.slots = slots;
    this.utterances = utterances;
  }

  get requiredProps() {
    return [
      'command',
      'id'
    ];
  }
}
