'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Requirement extends ConfigurableModel {
  constructor({ deniedText, itemId } = {}) {
    super(...arguments);
    this.itemId = itemId;
    this.deniedText = deniedText;
  }

  get requiredProps() {
    return [
      ['deniedText', 'String'],
      ['itemId', 'String']
    ];
  }
};
