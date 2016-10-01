'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Command {
  constructor(req, res, intent, state, game) {
    this.req = req;
    this.res = res;
    this.intent = intent;
    this.state = state;
    this.game = game;
  }

  perform() {
    throw new Error(`${ this.constructor.name } must implement a \`perform\` method.`);
  }

  getSlot(slot) {
    return this.req.slot(slot);
  }

  getCommandArg(key) {
    if (!this.intent.commandArgs) return;
    return this.intent.commandArgs[key];
  }

  say(msg) {
    const say = this.res.say(msg);
    if (say && say.send) say.send();
  }

  setState(state) {
    if (!state || state.constructor.name !== 'State') {
      throw new Error('State must be valid');
    }
    return this.game.stateManager.setState(
      this.req.userId, state
    ).catch(this.game.onError);
  }

  warn(err, meta = {}) {
    this.game.onError(err, Object.assign({
      game: this.game,
      intent: this.intent,
      req: this.req,
      res: this.res,
      severity: 'warning',
      state: this.state
    }, meta));
  }

  static getRequiredSlots() {
    throw new Error(`${ this.constructor.name } must implement a \`static getRequiredSlots\` method.`);
  }

  static getRequiredCommandArgs() {
    throw new Error(`${ this.constructor.name } must implement a \`static getRequiredCommandArgs\` method.`);
  }
};
