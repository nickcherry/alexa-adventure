'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const BaseModel = require('./base_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Game extends BaseModel {
  constructor(app, schema, stateManager) {
    super(...arguments);
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
    _.each(this.schema.intents, (intent) => {
      const handler = (req, res) => {
        const commandClass = intent.commandClass;
        const command = new commandClass(req, res, intent, self);
        return command.perform();
      };
      if (intent.command == 'launch') {
        this.app.launch(handler);
      } else {
        this.app.intent(intent.id, intent, handler);
      }
    });
  }
};
