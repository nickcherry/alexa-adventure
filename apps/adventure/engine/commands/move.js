'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const Command = require('./command');
const MapHelper = require('../helpers/map_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MoveCommand extends Command {
  perform() {
    const destinationName = this._slot('destination');
    const currentMap = MapHelper.getCurrentMap(this.state, this.game.schema);
    const destination = MapHelper.getDestination(destinationName, currentMap, this.game.schema);

    if (destination) {
      const self = this;
      this.state.mapId = destination.id;
      this.game.stateManager.setState(this.userId, this.state).then((state) => {
        self._say(`You are now entering ${ destinationName }`);
      });
    } else {
      this._say(`You can't get to ${ destinationName } from here`);
    }
    return true;
  }

  static getRequiredSlots() {
    return ['destination'];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
