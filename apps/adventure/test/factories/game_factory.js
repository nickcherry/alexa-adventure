'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const AppFactory = require('./app_factory');
const Factory = require('./factory');
const Game = require('../../engine/game');
const SchemaFactory = require('./schema_factory');
const StateFactory = require('./state_factory');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class GameFactory extends Factory {
  static default({ app, schema, state } = {}) {
    app = app || AppFactory.default();
    schema = schema || SchemaFactory.default();
    state = state || StateFactory.default();
    return new Game(app, schema, state);
  }
}
