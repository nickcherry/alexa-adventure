"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const CommandLoader = require('./commands/command_loader');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Game {
  constructor(app, script, state = {}) {
    if (!app || !script || !state) {
      throw new Error('The Game constructor requires at least two arguments: an alexa-app and a script');
    }
    this.app = app;
    this.script = script;
    this.state = state;
  }

  init() {
    this.script.intents.forEach((intent) => {
      this.app.intent(intent.id, intent, (req, res) => {
        const commandClass = CommandLoader.get(intent.command);
        const command = new commandClass(req, res, intent, this.script, this.state, this.app);
        return command.perform();
      });
    });
  }

  serialize() {
    return JSON.stringify(this);
  }
}
