'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const bugsnag = require('bugsnag');
const fs = require('fs');

const Database = require('./database');
const Game = require('./engine/game');
const Script = require('./engine/script');
const Settings = require('./settings');
const State = require('./engine/state');
const StateManager = require('./engine/state_manager');

/***********************************************/
/* App */
/***********************************************/

const db = new Database();
const scriptPath = __dirname + '/script.json';
const script = new Script(JSON.parse(fs.readFileSync(scriptPath)));
const stateManager = new StateManager({
  getState: db.getState,
  setState: db.setState
});

new Game(app, script, stateManager).init();

/***********************************************/
/* Exports */
/***********************************************/

module.exports = app;
