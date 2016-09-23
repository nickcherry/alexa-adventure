'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const arrayWithSize = require('./modules/array_with_size');
const nestedHashValidator = require('./modules/nested_hash_validator');
const recognizedMap = require('./modules/recognized_map');
const requiredProps = require('./modules/required_props');
const RequirementValidator = require('./requirement_validator');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MapValidator extends Validator {
  get validators() {
    return [
      [arrayWithSize, { key: 'connectedTo' }],
      [recognizedMap, { key: 'connectedTo', schema: this.opts.schema }],
      [nestedHashValidator, { key: 'requirements', validator: RequirementValidator }],
      requiredProps
    ];
  }
};
