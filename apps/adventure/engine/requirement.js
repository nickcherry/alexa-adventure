'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Requirement extends ConfigurableModel {
  constructor({ itemId } = {}) {
    super(...arguments);
    this.itemId = itemId;
  }

  get requiredProps() {
    return [
      ['itemId', 'String']
    ];
  }
};
