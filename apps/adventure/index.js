"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const bugsnag = require('bugsnag');
const fs = require('fs');

const Config = require('./config');
const Game = require('./engine/game');
const Script = require('./engine/script');
const State = require('./engine/state');
const StateManager = require('./engine/state_manager');

/***********************************************/
/* App */
/***********************************************/

module.change_code = 1;
bugsnag.register(Config.bugsnagApiKey);

const app = new alexa.app('adventure');

const scriptPath = __dirname + '/script.json';
const script = new Script(JSON.parse(fs.readFileSync(scriptPath)));
const stateManager = new StateManager({
  getState: (userId) => {

  },
  setState: (userId, data) => {

  }
});

new Game(app, script, stateManager).init();

/***********************************************/
/* Exports */
/***********************************************/

module.exports = app;
