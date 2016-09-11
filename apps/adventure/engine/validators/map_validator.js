"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const requiredProps = require('./modules/required_props');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MapValidator extends Validator {
  get validators() {
    return [
      requiredProps
    ];
  }
}
