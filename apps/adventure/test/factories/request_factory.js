'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class RequestFactory extends Factory {
  static default({ slot, userId } = {}) {
    const defaults = {
      slot: new Function(),
      session: { user: { userId: userId || 'TEST_USER' }}
    };
    return Object.assign(defaults, ...arguments);
  }
}
