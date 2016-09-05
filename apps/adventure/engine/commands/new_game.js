/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class new_gameCommand extends Command {
  perform() {
    this._say('And so it begins...');
    return true;
  }
  get requiredSlots() {
    return [];
  }
  get requiredCommandArgs() {
    return [];
  }
}
