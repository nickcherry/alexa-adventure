/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MoveCommand extends Command {
  perform() {
    const destination = this._slot('DESTINATION');
    this._say(`Move to ${ destination }`);
    return true;
  }
  get requiredSlots() {
    return [];
  }
  get requiredCommandArgs() {
    return [];
  }
}
