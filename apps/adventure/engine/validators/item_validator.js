'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const requiredProps = require('./modules/required_props');
const nestedHashValidator = require('./modules/nested_hash_validator');
const RequirementValidator = require('./requirement_validator');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ItemValidator extends Validator {
  get validators() {
    return [
      [
        nestedHashValidator, {
          key: 'requirements',
          validator: RequirementValidator,
          opts: this.opts
        }
      ],
      requiredProps
    ];
  }
};
