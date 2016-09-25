'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const noUnrecognizedKeys = require('./modules/no_unrecognized_keys');
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
        noUnrecognizedKeys, {
          validKeys: [
            'id',
            'isVisible',
            'name',
            'pickUpText',
            'requirements'
          ]
        }
      ],
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
