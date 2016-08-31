"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const app = new alexa.app('adventure');
const bugsnag = require('bugsnag');
const fs = require('fs');

const Config = require('./config');


/***********************************************/
/* App */
/***********************************************/

module.change_code = 1;

bugsnag.register(Config.bugsnagApiKey);

fs.readdirSync('requests').forEach((filename) => {
  require(filename)(app);
});


/***********************************************/
/* Exports */
/***********************************************/

module.exports = app;
