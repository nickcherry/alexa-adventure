"use strict"

/***********************************************/
/* Imports */
/***********************************************/

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
  static default({ req, res, state, intent, script, app } = {}) {
    req = req || RequestFactory.default();
    res = res || ResponseFactory.default();
    state = state || StateFactory.default();
    script = script || ScriptFactory.fromFile('simple_script');
    intent = intent || script.intents[0];
    return new (getCommandClass(intent))(req, res, state, intent, script, app);
  }
}
