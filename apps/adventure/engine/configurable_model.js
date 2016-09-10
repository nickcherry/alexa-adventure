"use strict"

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ConfigurableModel {

  constructor({ id, name } = {}) {
    this.id = id;
    this.name = name;
  }

  get requiredProps() {
    throw new Error([
      `${ this.constructor.name } must implement a \`get requiredProps\` method, `,
      'which should return an array of properties that must be defined by the script.'
    ].join(''));
  }

  get identity() {
    const className = this.constructor.name;
    if (this.id) {
      return `${ className } with id "${ this.id }"`;
    } else if (this.name) {
      return `${ className } with name "${ this.name }"`;
    } else {
      return `${ className } with json \`JSON.stringify(this)\``;
    }
  }
}
