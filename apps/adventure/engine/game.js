'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const BaseModel = require('./base_model');
const StateHelper = require('./helpers/state_helper');

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
        const perform = _.partial(self._perform.bind(self), req, res, intent);
        this.stateManager.getState(req.userId).then(perform).catch(self.onError);
        return false;
      };
      if (intent.command == 'launch') {
        this.app.launch(handler);
      } else {
        this.app.intent(intent.id, intent, handler);
      }
    });
  }

  _perform(req, res, intent, state) {
    try {
      StateHelper.ensureCurrentMap(state, this.schema);
      const commandClass = intent.commandClass;
      const command = new intent.commandClass(req, res, intent, state, this);
      return command.perform();
    } catch(err) {
      this.onError(err, { req, res, intent, state, game: this });
    }
  }
};
