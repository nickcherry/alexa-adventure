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
  constructor({ characters, connectedTo, items, name, requirements, searchText } = {}) {
    super(...arguments);
    this.connectedTo = connectedTo;
    this.characters = cast(characters, Character);
    this.items = cast(items, Item);
    this.name = name;
    this.requirements = cast(requirements, Requirement);
    this.searchText = searchText;
  }

  get requiredProps() {
    return super.requiredProps.concat([
      ['characters', 'Array'],
      ['connectedTo', 'Array'],
      ['items', 'Array'],
      ['name', 'String'],
      ['requirements', 'Array'],
      ['searchText', 'String']
    ]);
  }
};
