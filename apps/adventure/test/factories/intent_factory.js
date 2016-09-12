'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');
const Intent = require('../../engine/intent');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class IntentFactory extends Factory {
  static default() {
    return new Intent(...arguments);
  }
}
