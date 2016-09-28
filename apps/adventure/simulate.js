'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const colors = require('colors');
const fs = require('fs');

const AppFactory = require('./test/factories/app_factory');
const Database = require('./database');
const Game = require('./engine/game');
const interpolate = require('./engine/helpers/interpolation_helper').interpolate;
const Schema = require('./engine/schema');
const Settings = require('./settings');
const StateManager = require('./engine/state_manager');

/***********************************************/
/* Configuration */
/***********************************************/

const compactMode = process.env.npm_config_compact;

/***********************************************/
/* Load Script */
/***********************************************/

const SCRIPTS_DIR_DISPLAY = 'apps/adventures/scripts';
const SCRIPTS_DIR = __dirname + '/scripts';

const scriptFile = process.env.npm_config_script;

if (!scriptFile) {
  console.log('No script was specified!\n'.red.bold);
  console.log('Try specifying a script like this:'.red);
  console.log('   npm run simulate --script=my_script.json\n'.magenta);
  console.log('It should reference a script file relative to the following directory:'.red);
  console.log(`   ${ SCRIPTS_DIR_DISPLAY }\n`.magenta);
  process.exit(0);
}

const scriptPath = `${ SCRIPTS_DIR }/${ scriptFile }`;

if (!fs.existsSync(scriptPath)) {
  console.log('The specified script does not exist!\n'.red.bold);
  console.log(`Be sure to specify the file relative to the ${ SCRIPTS_DIR_DISPLAY } directory.\n`.red);
  console.log("And don't forget the .json extension!\n".red);
  process.exit(0);
}

const script = JSON.parse(fs.readFileSync(scriptPath));

/***********************************************/
/* Intercept Intent Config */
/***********************************************/

const intents = {};
const app = AppFactory.default({ name: 'Script Simulation' });
app.launch = (handler) => {
  intents.launch = handler;
}
app.intent = (id, _, handler) => {
  intents[id] = handler;
};

/***********************************************/
/* Initialize Game */
/***********************************************/

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
  setState: (userId, state) => {
    if (compactMode) {
      console.log(' State Updated'.yellow.bold);
    } else {
      console.log(' State Updated =>'.yellow.bold, state.serialize().yellow);
    }
    return db.setState(userId, state);
  }
});
const onError = (err, meta = {}) => {
  console.error("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".red);
  console.error("EGADS, AN ERROR OCCURRED!".red.bold);
  console.error((err.stack || err.message).red);
  console.error('\n\n' + JSON.stringify(meta, null, 2).red);
  console.error("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".red);
};
new Game(app, schema, stateManager, onError).init();

/***********************************************/
/* Invoke Intents */
/***********************************************/

const ensureTable = new Promise((resolve, reject) => {
  db.doesStatesTableExist().then((result) => {
    if (result) return resolve();
    db.createStatesTable().then(resolve);
  });
});

ensureTable.then(() => {
  _.each([{ id: 'launch' }].concat(script.intents), (intent, i) => {
    setTimeout(() => {

      // Verify that intent is defined
      const schemaIntent = _.find(schema.intents, { id: intent.id });
      if (!schemaIntent) {
        onError(new Error(`The schema does not define an intent with the id "${ intent.id }"`));
      }

      // Mock Request
      const req = {
        slot: (id) => {
          return intent.slots ? intent.slots[id] : undefined;
        },
        userId: 'amzn1.account.AM3B227HF3FAM1B2_SIMULATION'
      };

      // Mock Response
      const res = {
        say: (msg) => {
          console.log(' Response =>'.green.bold, msg.green);
        }
      };

      // Print Intent
      const slots = intent.slots ? JSON.stringify(intent.slots).cyan : '';
      console.log('\nIntent =>'.cyan.bold, intent.id.cyan, slots);

      // Verify that slots are defined
      if (intent.slots) {
        Object.keys(intent.slots).forEach((slot) => {
          if (!schemaIntent.slots[slot]) {
            onError(new Error(`The "${ slot }" slot is not defined in the "${ intent.id }" intent`));
          }
        });
      }

      // Invoke Command
      intents[intent.id](req, res);

    }, i * 100);
  });
});
