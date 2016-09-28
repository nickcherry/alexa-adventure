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
    return _.find(schema.lookupArray('item', items), { name: name });
  }
};
