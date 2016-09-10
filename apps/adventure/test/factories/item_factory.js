"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');
const Item = require('../../engine/item');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ItemFactory extends Factory {
  static default() {
    return new Item(...arguments);
  }
}
