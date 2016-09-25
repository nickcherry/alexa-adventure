'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const BaseModel = require('./base_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ConfigurableModel extends BaseModel {
  constructor(attrs = {}) {
    super(...arguments);
    const self = this;
    Object.keys(attrs).forEach((key) => {
      self[key] = attrs[key];
    });
  }

  get requiredProps() {
    return [
      ['id', 'String']
    ]
  }
};
