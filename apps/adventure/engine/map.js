'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const cast = require('./helpers/casting_helper').cast;
const Character = require('./character');
const ConfigurableModel = require('./configurable_model');
const Item = require('./item');
const Requirement = require('./requirement');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Map extends ConfigurableModel {
  constructor(attrs = {}) {
    super(...arguments);
    this.requirements = cast(this.requirements, Requirement) || [];
  }

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
