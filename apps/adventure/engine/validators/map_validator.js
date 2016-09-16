'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const arrayWithSize = require('./modules/array_with_size');
const recognizedMap = require('./modules/recognized_map');
const requiredProps = require('./modules/required_props');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MapValidator extends Validator {
  get validators() {
    return [
      [arrayWithSize, { key: 'connectedTo' }],
      [recognizedMap, { key: 'connectedTo', schema: this.opts.schema }],
      requiredProps
    ];
  }
};
