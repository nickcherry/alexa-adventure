"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const bugsnag = require('bugsnag');
const fs = require('fs');

const Config = require('./config');
const Game = require('./engine/game');
const Script = require('./engine/script');

/***********************************************/
/* App */
/***********************************************/

module.change_code = 1;
bugsnag.register(Config.bugsnagApiKey);

const app = new alexa.app('adventure');

const scriptPath = __dirname + '/script.json';
const script = new Script(JSON.parse(fs.readFileSync(scriptPath)));

const state = undefined; //TODO fetch from session

const game = new Game(app, script, state);
game.init();

/***********************************************/
/* Exports */
/***********************************************/

module.exports = app;
