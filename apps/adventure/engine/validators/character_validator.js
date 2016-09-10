"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CharacterValidator extends Validator {
  get validators() {
    return [
      require('./modules/required_props')
    ];
  }
}
