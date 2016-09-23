'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const recognizedModel = require('./modules/recognized_model');
const requiredProps = require('./modules/required_props');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class RequirementValidator extends Validator {
  get validators() {
    return [
      [recognizedModel, { type: 'item', key: 'connectedTo', schema: this.opts.schema }],
      requiredProps
    ];
  }
};
