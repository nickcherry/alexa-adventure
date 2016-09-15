'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');
const State = require('../state');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CurrentMapCommand extends Command {
  perform() {
    const map = this.game.schema.lookup('map', this.state.mapId);
    this._say(`You are currently ${ map.name }`);
    return true;
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
