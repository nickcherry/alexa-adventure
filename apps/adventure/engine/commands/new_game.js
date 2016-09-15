'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');
const State = require('../state');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class NewGameCommand extends Command {
  perform() {
    const state = new State({ mapId: this.game.schema.initialMapId });
    const self = this;
    this.stateManager.setState(this.userId, state).then((state) => {
      self._say('And so it begins...');
    }).catch((err) => {
      console.error('crap', err)
    });
    return true;
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
