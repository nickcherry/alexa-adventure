'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');
const LanguageHelper = require('../helpers/language_helper');
const MapHelper = require('../helpers/map_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ListConnectedMapsCommand extends Command {
  perform() {
    const currentMap = MapHelper.getCurrentMap(this.state, this.game.schema);
    const connectedMaps = MapHelper.getConnectedMaps(currentMap, this.game.schema);
    this.say(`You are near ${
      LanguageHelper.oxfordComma(connectedMaps.map((map) => map.name))
    }`);
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
