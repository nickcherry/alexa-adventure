'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ItemHelper {
  static getItemWithName(name, items, schema) {
    return _.find(schema.lookupArray('item', items), { name: name });
  }
};
