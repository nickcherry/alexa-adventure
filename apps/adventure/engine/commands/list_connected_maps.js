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
    const map = this.game.schema.lookup('map', this.state.mapId);
    const connectedMaps = this.game.schema.lookupArray('map', map.connectedTo);
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
