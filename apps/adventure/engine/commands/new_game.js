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
    this.say(this.getCommandArg('text'));
    this.setState(new State({ mapId: this.game.schema.initialMapId }));
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return ['text'];
  }
};
