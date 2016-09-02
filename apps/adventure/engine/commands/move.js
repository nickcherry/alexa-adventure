/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MoveCommand extends Command {

  static getRequiredSlots() {
    return ['DESTINATION'];
  }

  static getRequiredCommandArgs() {
    return ['speed'];
  }

  static getOptionalCommandArgs() {
    return [];
  }

  perform() {
    const destination = this._slot('DESTINATION');
    const speed = this._commandArg('speed');
    this._say(`Move to ${ destination } at a speed of ${ speed }`);
    return true;
  }
}
