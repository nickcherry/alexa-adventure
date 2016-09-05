"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Map extends ConfigurableModel {
  constructor({ connectedTo, contains, id, name }) {
    super();
    this.connectedTo = connectedTo;
    this.contains = contains;
    this.id = id;
    this.name = name;
  }

  get requiredProps() {
    return [
      'connectedTo',
      'id',
      'name'
    ];
  }
}
