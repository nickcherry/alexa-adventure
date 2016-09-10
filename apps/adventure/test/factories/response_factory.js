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
    const defaults = { say: new Function() };
    return Object.assign(defaults, ...arguments);
  }
}
