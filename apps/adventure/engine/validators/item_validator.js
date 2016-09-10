"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ItemValidator extends Validator {
  get validators() {
    return [
      require('./modules/required_props')
    ];
  }
}
