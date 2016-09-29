'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');
const MapHelper = require('../helpers/map_helper');
const RequirementHelper = require('../helpers/requirement_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MoveCommand extends Command {
  perform() {
    const destinationName = this.getSlot('destination');
    const currentMap = MapHelper.getCurrentMap(this.state, this.game.schema);
    const destination = MapHelper.getMapWithName(destinationName, currentMap, this.game.schema);

    if (!destination) {
      this.say(`You can't get to ${ destinationName } from here`);
      this.game.onError(new Error(`MoveCommand: Inaccessible destination "${ destinationName }"`));
      return;
    }

    const deniedText = RequirementHelper.getDeniedText(destination.requirements, this.state);
    if (deniedText) {
      return this.say(deniedText);
    }

    this.say(destination.introText);
    this.state.setMapId(destination.id, true);
    this.setState(this.state);
  }

  static getRequiredSlots() {
    return ['destination'];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
