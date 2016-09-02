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
    const value = this.req.slot(slot);
    if (value || !this.constructor.isRequiredSlot(slot)) return value;
    throw new Error(`${ this.constructor.name } expects a \`${ slot }\` slot value.`);
  }

  _commandArg(key) {
    if (!this.intent.commandArgs) return;
    return this.intent.commandArgs[key];
  }

  _say(msg) {
    this.res.say(msg);
  }

  static getRequiredSlots() {
    throw new Error([
      `${ this.name } must implement a \`getRequiredSlots\` static method, `,
      'which should return an array of slots required by the command.'
    ].join(''));
  }

  static isRequiredSlot(slot) {
    return _.includes(this.getRequiredSlots(), slot);
  };

  static getRequiredCommandArgs() {
    throw new Error([
      `${ this.name } must implement a \`getRequiredCommandArgs\` static method, `,
      'which should return an array of \`commandArg\` keys required by the command.'
    ].join(''));
  }

  static isRequiredCommandArg(key) {
    return _.inclues(this.getRequiredCommandArgs(), key);
  }

  static getOptionalCommandArgs() {
    throw new Error([
      `${ this.name } must implement a \`getOptionalCommandArgs\` static method, `,
      'which should return an array of optional \`commandArg\` that can be used by the command.'
    ].join(''));
  }
}
