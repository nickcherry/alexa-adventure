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
    super();
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
