'use strict';

/***********************************************/
/* Imports */
/***********************************************/

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
  static default({ app, game, intent, req, res, schema, stateManager } = {}) {
    req = req || RequestFactory.default();
    res = res || ResponseFactory.default();

    app = app || AppFactory.default();
    schema = schema || SchemaFactory.fromFile('simple_schema');
    stateManager = stateManager || StateManagerFactory.default();

    game = game || GameFactory.default({ app, schema, stateManager });
    intent = intent || schema.intentsAsArray[0];

    return new (getCommandClass(intent))(req, res, intent, game);
  }
}
