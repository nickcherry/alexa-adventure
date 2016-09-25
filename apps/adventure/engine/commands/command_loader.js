'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Private */
/***********************************************/

const COMMAND_KEYS = [
  'cancel',
  'current_map',
  'help',
  'launch',
  'list_connected_maps',
  'move',
  'new_game',
  'no',
  'pick_up',
  'search',
  'session_ended',
  'stop',
  'talk',
  'yes'
];

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CommandLoader {
  constructor() {
    throw new Error('CommandLoader cannot be instantiated.');
  }

  static get(commandKey) {
    if (_.includes(COMMAND_KEYS, commandKey)) {
      return require(`${ __dirname }/${ commandKey }`);
    }
  }

  static getAll() {
    return COMMAND_KEYS.map((commandKey) => {
      return CommandLoader.get(commandKey);
    });
  }
};
