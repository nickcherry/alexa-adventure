'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const Item = require('../item');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ItemHelper {
  static getItemWithName(name, items, schema) {
    const partialItem = _.find(items, (item) => {
      const schemaItem = schema.lookup('item', item.id);
      return schemaItem && schemaItem.name === name;
    });
    return partialItem ? this.assembleItem(partialItem, schema) : undefined;
  }

  static assembleItem(partialItem, schema) {
    if (!partialItem) return;
    return new Item(Object.assign({}, schema.lookup('item', partialItem.id), partialItem));
  }

  static assembleItems(partialItems, schema) {
    const self = this;
    return partialItems.map((partialItem) => {
      return self.assembleItem(partialItem, schema);
    });
  }
};
