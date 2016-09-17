'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');
const MapHelper = require('../helpers/map_helper');
const State = require('../state');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CurrentMapCommand extends Command {
  perform() {
    const currentMap = MapHelper.getCurrentMap(this.state, this.game.schema);
    this._say(`You are currently in ${ currentMap.name }`);
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
