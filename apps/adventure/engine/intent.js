"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');
const CommandLoader = require('./commands/command_loader');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Intent extends ConfigurableModel {
  constructor({ command, commandArgs, slots, utterances } = {}) {
    super(...arguments);
    this.command = command;
    this.commandArgs = commandArgs;
    this.slots = slots;
    this.utterances = utterances;
  }

  get commandClass() {
    return CommandLoader.get(this.command);
  }

  get requiredProps() {
    return super.requiredProps.concat([
      ['command', 'String']
    ]);
  }
}
