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
    this.game.stateManager.setState(this.userId, state).then((state) => {
      self._say(self._commandArg('text'));
    });
    return true;
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return ['text'];
  }
};
