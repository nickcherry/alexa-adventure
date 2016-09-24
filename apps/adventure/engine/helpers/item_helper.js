'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ItemHelper {
  static getItemWithName(name, itemIds, schema) {
    return _.find(schema.lookupArray('item', itemIds), { name: name });
  }
};
