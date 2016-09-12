'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const AppFactory = require('./app_factory');
const Factory = require('./factory');
const Game = require('../../engine/game');
const ScriptFactory = require('./script_factory');
const StateFactory = require('./state_factory');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class GameFactory extends Factory {
  static default({ app, script, state } = {}) {
    app = app || AppFactory.default();
    script = script || ScriptFactory.default();
    state = state || StateFactory.default();
    return new Game(app, script, state);
  }
}
