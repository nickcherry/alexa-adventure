"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');
const fs = require('fs');
const Script = require('../../engine/script');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ScriptFactory extends Factory {
  static default({ data } = {}) {
    return new Script(data);
  }
  static fromFile(filename) {
    const path = `${ __dirname }/../files/${ filename }.json`;
    const data = JSON.parse(fs.readFileSync(path).toString());
    return this.default({ data: data });
  }
}
