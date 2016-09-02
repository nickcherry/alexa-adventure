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

  _requireSlot(slot) {
    const value = this.req.slot(slot);
    if (value) return value;
    throw new Error(`${ this.constructor.name } expects a \`${ slot }\` slot value.`);
  }

  _commandArg(key) {
    if (!this.intent.commandArgs) return;
    return this.intent.commandArgs[key];
  }

  _say(msg) {
    this.res.say(msg);
  }
}
