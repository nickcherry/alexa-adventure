'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Character = require('./character');
const ConfigurableModel = require('./configurable_model');
const Item = require('./item');
const Requirement = require('./requirement');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Map extends ConfigurableModel {
  get requiredProps() {
    return super.requiredProps.concat([
      ['characters', 'Array'],
      ['connectedTo', 'Array'],
      ['introText', 'String'],
      ['items', 'Array'],
      ['name', 'String'],
      ['requirements', 'Array'],
      ['searchText', 'String']
    ]);
  }
};
