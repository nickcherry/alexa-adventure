'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Game {
  constructor(app, schema, stateManager) {
    if (!app || !schema || !stateManager) {
      throw new Error([
        'The Game constructor requires three arguments: ',
        'an alexa-app, a schema, and a state manager'
      ].join(''));
    }
    this.app = app;
    this.schema = schema;
    this.stateManager = stateManager;
  }

  init() {
    const self = this;
    this.schema.intentsAsArray.forEach((intent) => {
      this.app.intent(intent.id, intent, (req, res) => {
        const commandClass = intent.commandClass;
        const command = new commandClass(req, res, intent, self);
        return command.perform();
      });
    });
  }
};
