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
    const destinationName = this._slot('destination');
    const currentMap = MapHelper.getCurrentMap(this.state, this.game.schema);
    const destination = MapHelper.getMapWithName(destinationName, currentMap, this.game.schema);

    if (destination) {
      const self = this;
      this.state.setMapId(destination.id, true);
      this.game.stateManager.setState(this.req.userId, this.state).then(() => {
        self._say(destination.introText);
      }).catch(this.game.onError);
    } else {
      this._say(`You can't get to ${ destinationName } from here`);
    }
  }

  static getRequiredSlots() {
    return ['destination'];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
