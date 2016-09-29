'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const noUnrecognizedKeys = require('./modules/no_unrecognized_keys');
const recognizedModel = require('./modules/recognized_model');
const requiredProps = require('./modules/required_props');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class RequirementValidator extends Validator {
  get validators() {
    return [
      [
        noUnrecognizedKeys, {
          validKeys: [
            'item',
            'deniedText'
          ]
        }
      ],
      [recognizedModel, { type: 'item', key: 'id', schema: this.opts.schema }],
      requiredProps
    ];
  }
};
