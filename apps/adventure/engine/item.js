"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Item extends ConfigurableModel {
  constructor() {
    super(...arguments);
  }

  get requiredProps() {
    return [
      'id',
      'name'
    ];
  }
}
