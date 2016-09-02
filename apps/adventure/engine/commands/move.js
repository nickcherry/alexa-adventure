/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MoveCommand extends Command {
  perform() {
    const destination = this._requireSlot('DESTINATION');
    const speed = this._commandArg('speed');
    this._say(`Move to ${ destination } at a speed of ${ speed }`);
    return true;
  }
}
