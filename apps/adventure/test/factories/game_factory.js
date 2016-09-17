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
  static default({ app, schema, state, stateManager } = {}) {
    app = app || AppFactory.default();
    schema = schema || SchemaFactory.default();
    stateManager = stateManager || StateManagerFactory.default();
    return new Game(app, schema, stateManager);
  }
}
