'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Character extends ConfigurableModel {
  get requiredProps() {
    return super.requiredProps.concat([
      ['name', 'String']
    ]);
  }
};
