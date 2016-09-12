'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Map extends ConfigurableModel {
  constructor({ connectedTo, contains, name } = {}) {
    super(...arguments);
    this.connectedTo = connectedTo;
    this.contains = contains;
    this.name = name;
  }

  get requiredProps() {
    return super.requiredProps.concat([
      ['connectedTo', 'Array'],
      ['contains', 'Array'],
      ['name', 'String']
    ]);
  }
};
