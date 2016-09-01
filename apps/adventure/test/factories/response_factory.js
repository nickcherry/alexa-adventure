"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ResponseFactory extends Factory {
  static default() {
    return { say: new Function() };
  }
}
