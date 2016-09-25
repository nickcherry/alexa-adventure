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
  constructor({ characters, connectedTo, introText, items, name, requirements, searchText } = {}) {
    super(...arguments);
    this.connectedTo = connectedTo;
    this.characters = characters;
    this.introText = introText;
    this.items = items;
    this.name = name;
    this.requirements = requirements;
    this.searchText = searchText;
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
