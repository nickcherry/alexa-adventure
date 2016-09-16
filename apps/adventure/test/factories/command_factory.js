'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

const AppFactory = require('./app_factory');
const Factory = require('./factory');
const CommandLoader = require('../../engine/commands/command_loader');
const GameFactory = require('./game_factory');
const RequestFactory = require('./request_factory');
const ResponseFactory = require('./response_factory');
const SchemaFactory = require('./schema_factory');
const StateFactory = require('./state_factory');
const StateManagerFactory = require('./state_manager_factory');

/***********************************************/
/* Private */
/***********************************************/

const getCommandClass = (intent) => {
  return CommandLoader.get(intent.command);
}

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CommandFactory extends Factory {
  static default({ app, commandClass, game, intent, req, res, schema, state, stateManager, userId } = {}) {
    req = req || RequestFactory.default();
    res = res || ResponseFactory.default();

    app = app || AppFactory.default();
    schema = schema || SchemaFactory.fromFile('simple_schema');
    stateManager = stateManager || StateManagerFactory.default();
    state = state || StateFactory.default();
    userId = userId || 'user_123456789';

    game = game || GameFactory.default({ app, schema, stateManager });
    intent = intent || _.values(schema.intents)[0];

    return new (commandClass || getCommandClass(intent))(req, res, intent, userId, state, game);
  }
}
