'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const colors = require('colors');
const fs = require('fs');

/***********************************************/
/* Config */
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

console.log(scriptPath)
if (!fs.existsSync(scriptPath)) {
  console.log('The specified script does not exist!\n'.red.bold);
  console.log(`Be sure to specify the file relative to the ${ SCRIPTS_DIR_DISPLAY } directory.\n`.red);
  process.exit(0);
}

const script = JSON.parse(fs.readFileSync(scriptPath));
script.forEach((action) => {
  console.log(action);
});

