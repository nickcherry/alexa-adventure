'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const BaseModel = require('./base_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ConfigurableModel extends BaseModel {

  constructor() {
    super(...arguments);
  }

  get requiredProps() {
    return [
      ['id', 'String']
    ]
  }
};
