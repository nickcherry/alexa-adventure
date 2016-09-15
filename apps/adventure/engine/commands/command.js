'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Command {
  constructor(req, res, intent, userId, state, game) {
    this.req = req;
    this.res = res;
    this.intent = intent;
    this.userId = userId;
    this.state = state;
    this.game = game;
  }

  perform() {
    throw new Error(`${ this.constructor.name } must implement a \`perform\` method.`);
  }

  _slot(slot) {
    return this.req.slot(slot);
  }

  _commandArg(key) {
    if (!this.intent.commandArgs) return;
    return this.intent.commandArgs[key];
  }

  _say(msg) {
    this.res.say(msg);
  }

  static getRequiredSlots() {
    throw new Error(`${ this.constructor.name } must implement a \`static getRequiredSlots\` method.`);
  }

  static getRequiredCommandArgs() {
    throw new Error(`${ this.constructor.name } must implement a \`static getRequiredCommandArgs\` method.`);
  }
};
