'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Requirement extends ConfigurableModel {
  get requiredProps() {
    return [
      ['deniedText', 'String'],
      ['item', 'Object']
    ];
  }
};
