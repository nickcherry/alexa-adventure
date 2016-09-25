'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const noUnrecognizedKeys = require('./modules/no_unrecognized_keys');
const requiredProps = require('./modules/required_props');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class LaunchValidator extends Validator {
  get validators() {
    return [
      [
        noUnrecognizedKeys, {
          validKeys: [
            'id',
            'command',
            'commandArgs'
          ]
        }
      ],
      [requiredProps]
    ];
  }
};
