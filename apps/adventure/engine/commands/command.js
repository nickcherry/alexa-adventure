/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Command {
  constructor(req, res, intent, state, script, app) {
    this.req = req;
    this.res = res;
    this.intent = intent;
    this.state = state;
    this.script = script;
    this.app = app;
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

  get requiredSlots() {
    throw new Error(`${ this.constructor.name } must implement a \`get requiredSlots\` method.`);
  }

  get requiredCommandArgs() {
    throw new Error(`${ this.constructor.name } must implement a \`get requiredCommandArgs\` method.`);
  }
}
