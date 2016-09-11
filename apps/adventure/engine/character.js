"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Character extends ConfigurableModel {
  constructor({ name } = {}) {
    super(...arguments);
    this.name = name;
  }

  get requiredProps() {
    return super.requiredProps.concat([
      ['name', 'String']
    ]);
  }
}
