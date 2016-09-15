'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ListConnectedMapsCommand extends Command {
  perform() {
    const destination = this._slot('DESTINATION');
    this._say(`Move to ${ destination }`);
    return true;
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
