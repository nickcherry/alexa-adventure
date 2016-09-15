'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');
const MapHelper = require('../helpers/map_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ListConnectedMapsCommand extends Command {
  perform() {
    const currentMap = MapHelper.getCurrentMap(this.state, this.game.schema);
    const connectedMaps = MapHelper.getConnectedMaps(currentMap, this.game.schema);
    const connectedMapNames = connectedMaps.map((map) => map.name).join(' and ');
    this._say(`You are near ${ connectedMapNames }`);
    return true;
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
