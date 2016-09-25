'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class RequirementHelper {
  static isSatisfied(requirement, state) {
    return state.hasItemWithId(requirement.itemId);
  }

  static filterUnsatisfied(requirements, state) {
    const self = this;
    return requirements.filter((requirement) => {
      return !self.isSatisfied(requirement, state)
    });
  }
};
