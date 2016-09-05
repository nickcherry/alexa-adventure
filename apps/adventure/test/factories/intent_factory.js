"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');
const Intent = require('../../engine/intent');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class IntentFactory extends Factory {
  static default({ id, command, commandArgs }) {
    return new Intent({ id, command, commandArgs });
  }
}
