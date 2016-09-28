'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');
const MapHelper = require('../helpers/map_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MoveCommand extends Command {
  perform() {
    const destinationName = this.getSlot('destination');
    const currentMap = MapHelper.getCurrentMap(this.state, this.game.schema);
    const destination = MapHelper.getMapWithName(destinationName, currentMap, this.game.schema);

    if (destination) {
      this.say(destination.introText);
      this.state.setMapId(destination.id, true);
      this.setState(this.state);
    } else {
      this.say(`You can't get to ${ destinationName } from here`);
    }
  }

  static getRequiredSlots() {
    return ['destination'];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
