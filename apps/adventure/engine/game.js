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
  constructor(app, schema, stateManager, onError) {
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
    this.onError = onError || ((err, meta) => console.error(err));
  }

  init() {
    const self = this;
    _.each(this.schema.intents, (intent) => {
      const handler = (req, res) => {
        const perform = (state) => {
          try {
            const commandClass = intent.commandClass;
            const command = new commandClass(req, res, intent, state, self);
            return command.perform();
          } catch(err) {
            self.onError(err, { req, res, intent, state, game: self });
          }
        };
        this.stateManager.getState(req.userId).then(perform).catch(perform);
        return false;
      };
      if (intent.command == 'launch') {
        this.app.launch(handler);
      } else {
        this.app.intent(intent.id, intent, handler);
      }
    });
  }
};
