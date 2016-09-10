"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Map extends ConfigurableModel {
  constructor({ connectedTo, contains }) {
    super(...arguments);
    this.connectedTo = connectedTo;
    this.contains = contains;
  }

  get requiredProps() {
    return [
      'connectedTo',
      'id',
      'name'
    ];
  }
}
