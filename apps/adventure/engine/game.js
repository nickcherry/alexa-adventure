"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const CommandLoader = require('./commands/command_loader');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Game {
  constructor(app, script, stateManager) {
    if (!app || !script || !stateManager) {
      throw new Error([
        'The Game constructor requires three arguments: ',
        'an alexa-app, a script, and a state manager'
      ].join(''));
    }
    this.app = app;
    this.script = script;
    this.stateManager = stateManager;
  }

  init() {
    const self = this;
    this.script.intents.forEach((intent) => {
      this.app.intent(intent.id, intent, (req, res) => {
        const commandClass = CommandLoader.get(intent.command);
        const command = new commandClass(req, res, intent, game);
        return command.perform();
      });
    });
  }

  serialize() {
    return JSON.stringify(this);
  }
}
