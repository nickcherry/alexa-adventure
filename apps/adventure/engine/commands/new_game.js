/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class NewGameCommand extends Command {

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return [];
  }

  static getOptionalCommandArgs() {
    return [];
  }

  perform() {
    this._say('And so it begins...');
    return true;
  }
}
