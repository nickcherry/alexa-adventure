'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MoveCommand extends Command {
  perform() {
    const map = this.game.schema.lookup('map', this.state.mapId);
    const destinationName = this._slot('destination');

    const possibleDestinations = _.filter(this.game.schema.maps, {
      name: destinationName
    });

    const destination = _.find(possibleDestinations, (destination) => {
      return map.connectedTo.includes(destination.id);
    });

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
