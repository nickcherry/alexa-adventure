"use strict";

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
const ScriptFactory = require('./script_factory');
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
  static default({ app, game, intent, req, res, script, stateManager } = {}) {
    req = req || RequestFactory.default();
    res = res || ResponseFactory.default();

    app = app || AppFactory.default();
    script = script || ScriptFactory.fromFile('simple_script');
    stateManager = stateManager || StateManagerFactory.default();

    game = game || GameFactory.default({ app, script, stateManager });
    intent = intent || _.first(script.intents);

    return new (getCommandClass(intent))(req, res, intent, game);
  }
}
