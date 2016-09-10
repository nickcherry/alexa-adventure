"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');
const Map = require('../../engine/map');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MapFactory extends Factory {
  static default() {
    return new Map(...arguments);
  }
}
