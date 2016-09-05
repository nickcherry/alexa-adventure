"use strict"

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ConfigurableModel {
  get requiredProps() {
    throw new Error([
      `${ this.constructor.name } must implement a \`get requiredProps\` method, `,
      'which should return an array of properties that must be defined by the script.'
    ].join(''));
  }
}
