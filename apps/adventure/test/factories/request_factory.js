"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class RequestFactory extends Factory {
  static default() {
    return { slot: new Function() };
  }
}
