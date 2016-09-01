/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Private */
/***********************************************/

COMMANDS = [
  'move',
  'new_game'
];

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CommandLoader {
  constructor() {
    throw new Error('CommandLoader cannot be instantiated.');
  }
  static get(commandId) {
    if (_.includes(COMMANDS, commandId)) {
      return require(`${ __dirname }/${ commandId }`);
    } else {
      throw new Error(`\`${ commandId }\` is not a recognized command.`);
    }
  }
}
