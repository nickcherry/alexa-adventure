'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');
const State = require('../../engine/state');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class StateFactory extends Factory {
  static default() {
    return new State(...arguments);
  }
}
