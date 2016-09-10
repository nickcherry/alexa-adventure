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
    if (COMMAND_KEYS.includes(commandKey)) {
      return require(`${ __dirname }/${ commandKey }`);
    }
  }

  static getAll() {
    return COMMAND_KEYS.map((commandKey) => {
      return CommandLoader.get(commandKey);
    });
  }
}
