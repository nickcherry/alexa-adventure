'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class RequirementHelper {
  static isSatisfiedForItem(requirement, command) {
    return !requirement.item || !!command.state.getItem(requirement.item);
  }

  static isSatisfiedForCommandArgs(requirement, command) {
    return !requirement.commandArgs || _.every(requirement.commandArgs, (commandArg) => {
      return undefined !== command.getCommandArg(commandArg);
    });
  }

  static isSatisfied(requirement, command) {
    return _.every([
      this.isSatisfiedForItem,
      this.isSatisfiedForCommandArgs
    ], (check) => check(requirement, command));
  }

  static getUnsatisfied(requirements, command) {
    const self = this;
    return requirements.filter((requirement) => {
      return !self.isSatisfied(requirement, command);
    });
  }

  static getDeniedText(requirements, command) {
    const unsatisfied = this.getUnsatisfied(requirements, command);
    return unsatisfied.length ? unsatisfied[0].deniedText : undefined;
  }
};
