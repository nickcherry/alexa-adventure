'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class HelpCommand extends Command {
  perform() {
    this._say(this._commandArg('text'));
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return ["text"];
  }
};
