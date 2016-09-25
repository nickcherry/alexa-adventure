'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const arrayWithSize = require('./modules/array_with_size');
const nestedHashValidator = require('./modules/nested_hash_validator');
const recognizedArrayOfModels = require('./modules/recognized_array_of_models');
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
      [recognizedArrayOfModels, { arrayKey: 'characters', key: 'id', type: 'character', schema: this.opts.schema }],
      [recognizedArrayOfModels, { arrayKey: 'items', key: 'id', type: 'item', schema: this.opts.schema }],
      [recognizedArrayOfModels, { arrayKey: 'connectedTo', key: 'id', type: 'map', schema: this.opts.schema }],
      [recognizedArrayOfModels, { arrayKey: 'requirements', key: 'id', type: 'item', schema: this.opts.schema }],
      requiredProps
    ];
  }
};
