"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const AppFactory = require('./app_factory');
const Factory = require('./factory');
const CommandLoader = require('../../engine/commands/command_loader');
const RequestFactory = require('./request_factory');
const ResponseFactory = require('./response_factory');
const ScriptFactory = require('./script_factory');
const StateFactory = require('./state_factory');

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
  static default({ req, res, intent, state, script, app } = {}) {
    req = req || RequestFactory.default();
    res = res || ResponseFactory.default();
    state = state || StateFactory.default();
    script = script || ScriptFactory.fromFile('simple_script');
    intent = intent || _.first(script.intents);
    return new (getCommandClass(intent))(req, res, intent, state, script, app);
  }
}
