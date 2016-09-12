'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');
const Character = require('../../engine/character');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CharacterFactory extends Factory {
  static default() {
    return new Character(...arguments);
  }
}
