/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Private */
/***********************************************/

COMMAND_KEYS = [
  'move',
  'new_game'
]

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
}
