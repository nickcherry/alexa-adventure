'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Validator = require('./validator');

const recognizedCommand = require('./modules/recognized_command');
const requiredCommandArgs = require('./modules/required_command_args');
const requiredProps = require('./modules/required_props');
const requiredSlots = require('./modules/required_slots');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class IntentValidator extends Validator {
  get validators() {
    return [
      recognizedCommand,
      requiredCommandArgs,
      requiredProps,
      requiredSlots
    ];
  }
};
