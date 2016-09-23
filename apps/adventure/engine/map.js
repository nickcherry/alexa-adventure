'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');
const Requirement = require('./requirement');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Map extends ConfigurableModel {
  constructor({ connectedTo, items, name, requirements } = {}) {
    super(...arguments);
    this.connectedTo = connectedTo;
    this.items = items;
    this.name = name;
    this.requirements = (requirements || []).map((attrs) => {
      return new Requirement(attrs)
    });
  }

  get requiredProps() {
    return super.requiredProps.concat([
      ['connectedTo', 'Array'],
      ['items', 'Array'],
      ['name', 'String']
    ]);
  }
};
