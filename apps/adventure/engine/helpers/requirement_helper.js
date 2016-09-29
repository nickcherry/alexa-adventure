'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class RequirementHelper {
  static isSatisfied(requirement, state) {
    return !!state.getItem(requirement.item);
  }

  static getUnsatisfied(requirements, state) {
    const self = this;
    return requirements.filter((requirement) => {
      return !self.isSatisfied(requirement, state);
    });
  }

  static getDeniedText(requirements, state) {
    const unsatisfied = this.getUnsatisfied(requirements, state);
    return unsatisfied.length ? unsatisfied[0].deniedText : undefined;
  }
};
