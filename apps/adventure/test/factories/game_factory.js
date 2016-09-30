'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const AppFactory = require('./app_factory');
const Factory = require('./factory');
const Game = require('../../engine/game');
const SchemaFactory = require('./schema_factory');
const StateManagerFactory = require('./state_manager_factory');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class GameFactory extends Factory {
  static default({ app, onError, schema, state, stateManager } = {}) {
    app = app || AppFactory.default();
    schema = schema || SchemaFactory.default();
    stateManager = stateManager || StateManagerFactory.default();
    onError = onError || function() {}
    return new Game(app, schema, stateManager, onError);
  }
}
