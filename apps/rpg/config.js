"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const fs = require('fs');


/***********************************************/
/* Config */
/***********************************************/

const secrets = JSON.parse(fs.readFileSync(__dirname + '/secrets.json'));

class Config {
  // static get sampleKey() {
  //   return secrets.sampleKey;
  // }
}

module.exports = Config;
