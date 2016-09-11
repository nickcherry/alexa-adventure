"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const Factory = require('./factory');
const ConfigurableModel = require('../../engine/configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ConfigurableModelFactory extends Factory {
  static default({ id, name, requiredProps } = {}) {
    id = id || 'dummyId'
    name = name || 'Dummy Name'
    const attrs = Object.assign(...arguments, { id, name });
    delete attrs.requiredProps;
    return _.tap(new ConfigurableModel(attrs), (model) => {
      if (requiredProps) {
        Object.defineProperty(model, 'requiredProps', {
          get: () => requiredProps
        });
      }
    });
  }
}
