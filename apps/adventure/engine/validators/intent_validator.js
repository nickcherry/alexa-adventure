"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class IntentValidator extends Validator {
  get validators() {
    return [
      require('./modules/required_props'),
      require('./modules/recognized_command'),
      require('./modules/required_slots'),
      require('./modules/required_command_args')
    ];
  }
}
