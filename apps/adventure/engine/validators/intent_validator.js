'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Validator = require('./validator');

const noUnrecognizedKeys = require('./modules/no_unrecognized_keys');
const recognizedCommand = require('./modules/recognized_command');
const requiredCommandArgs = require('./modules/required_command_args');
const requiredProps = require('./modules/required_props');
const requiredSlots = require('./modules/required_slots');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class IntentValidator extends Validator {
  get validators() {
    return [
      [
        noUnrecognizedKeys, {
          validKeys: [
            'id',
            'command',
            'commandArgs',
            'slots',
            'utterances'
          ]
        }
      ],
      recognizedCommand,
      requiredCommandArgs,
      requiredProps,
      requiredSlots
    ];
  }
};
