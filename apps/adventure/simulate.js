'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const colors = require('colors');
const fs = require('fs');

const AppFactory = require('./test/factories/app_factory');
const Database = require('./database');
const Game = require('./engine/game');
const Schema = require('./engine/schema');
const StateManager = require('./engine/state_manager');

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
  process.exit(0);
}

const script = JSON.parse(fs.readFileSync(scriptPath));

/***********************************************/
/* Intercept Intent Config */
/***********************************************/

const intents = {};
const app = AppFactory.default({ name: 'Script Simulation' });
app.intent = (id, _, handler) => {
  intents[id] = handler;
};

/***********************************************/
/* Initialize Game */
/***********************************************/

const db = new Database();
const schemaPath = __dirname + '/schema.json';
const schema = new Schema(JSON.parse(fs.readFileSync(schemaPath)));
const stateManager = new StateManager({
  getState: db.getState,
  setState: db.setState
});
new Game(app, schema, stateManager).init();

/***********************************************/
/* Invoke Intents */
/***********************************************/

script.forEach((intent) => {
  const req = {
    slot: (id) => {
      return intent.slots ? intent.slots[id] : undefined;
    }
  };
  const res = {
    session: {
      user: {
        userId: 'amzn1.account.AM3B227HF3FAM1B2_SIMULATION'
      }
    },
    say: (msg) => {
      console.log(
        'Response =>'.green.bold,
        msg.green
      );
    }
  };

  console.log(
    'Intent =>'.cyan.bold,
    intent.id.cyan,
    intent.slots ? JSON.stringify(intent.slots).cyan : ''
  );

  intents[intent.id](req, res);
});
