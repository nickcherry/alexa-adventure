"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Character extends ConfigurableModel {
  constructor({ id, name }) {
    super(...arguments);
    this.id = id;
    this.name = name;
  }

  get requiredProps() {
    return [
      'id',
      'name'
    ];
  }
}
