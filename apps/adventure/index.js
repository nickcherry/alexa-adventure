'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const bugsnag = require('bugsnag');
const colors = require('colors');
const fs = require('fs');

const Database = require('./database');
const env = require('./env');
const Game = require('./engine/game');
const interpolate = require('./engine/helpers/interpolation_helper').interpolate;
const Schema = require('./engine/schema');
const Settings = require('./settings');
const State = require('./engine/state');
const StateManager = require('./engine/state_manager');

/***********************************************/
/* Configuration */
/***********************************************/

module.change_code = 1;
bugsnag.register(Settings.bugsnagApiKey, {
  autoNotify: false,
  notifyReleaseStages: ['production'],
  packageJSON: './package.json',
  projectRoot: './'
});

/***********************************************/
/* App */
/***********************************************/

const app = new alexa.app('adventure');
const db = new Database();

const schemaPath = __dirname + '/schema.json';
const schema = new Schema(
  JSON.parse(
    interpolate(
      fs.readFileSync(schemaPath).toString(),
      Settings.schemaConstants
    )
  )
);
const stateManager = new StateManager({
  getState: db.getState,
  setState: db.setState
});

const onError = (err, meta = {}) => {
  console.error("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".red);
  console.error("Egads!".red.bold);
  console.error((err.stack || err.message).red);
  console.error("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".red);
  if (meta.req) {
    // Avoid conflicts with Bugsnag
    meta._req = JSON.parse(JSON.stringify(meta.req));
    delete meta.req;
  }
  bugsnag.notify(err, meta);
};

new Game(app, schema, stateManager, onError).init();

db.doesStatesTableExist().then((result) => {
  if (!result) db.createStatesTable();
}).catch((err) => {
  console.error('There was an error connecting to the database.');
  bugsnag.notify(err);
});

/***********************************************/
/* Exports */
/***********************************************/

module.exports = app;
