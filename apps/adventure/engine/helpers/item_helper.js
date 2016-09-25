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
    const itemIds = items.map((item) => item.id);
    const schemaItem = _.find(schema.lookupArray('item', itemIds), { name: name });
    if (!schemaItem) return;
    return Object.assign(schemaItem, _.find(items, { id: schemaItem.id }));
  }
};
