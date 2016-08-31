"use strict"

/***********************************************/
/* Settings */
/***********************************************/

module.change_code = 1;


/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const app = new alexa.app('rpg');
const bugsnag = require("bugsnag");

const Config = require('./config');


/***********************************************/
/* Skill */
/***********************************************/

bugsnag.register(Config.bugsnagApiKey);

bugsnag.autoNotify({ context: 'hello' }, () => {
  //
});

/***********************************************/
/* Exports */
/***********************************************/

module.exports = app;
