'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class NoCommand extends Command {
  perform() {
    this.say(this.getCommandArg('defaultText'));
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return ['defaultText'];
  }
};
