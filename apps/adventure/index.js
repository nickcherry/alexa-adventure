'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const bugsnag = require('bugsnag');
const colors = require('colors');
const fs = require('fs');

const Database = require('./database');
const Game = require('./engine/game');
const Schema = require('./engine/schema');
const Settings = require('./settings');
const State = require('./engine/state');
const StateManager = require('./engine/state_manager');

/***********************************************/
/* App */
/***********************************************/

module.change_code = 1;
bugsnag.register(Settings.bugsnagApiKey);

const app = new alexa.app('adventure');
const db = new Database();

const schemaPath = __dirname + '/schema.json';
const schema = new Schema(JSON.parse(fs.readFileSync(schemaPath)));
const stateManager = new StateManager({
  getState: db.getState,
  setState: db.setState
});

const onError = (err) => {
  console.error('ERROR'.red);
  console.error(err);
};

new Game(app, schema, stateManager, onError).init();

db.doesStatesTableExist().then((result) => {
  if (!result) db.createStatesTable();
})

/***********************************************/
/* Exports */
/***********************************************/

module.exports = app;
