'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');
const Requirement = require('../../engine/requirement');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class RequirementFactory extends Factory {
  static default() {
    return new Requirement(...arguments);
  }
}
