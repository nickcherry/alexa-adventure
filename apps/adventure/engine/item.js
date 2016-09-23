'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');
const Requirement = require('./requirement');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Item extends ConfigurableModel {
  constructor({ name, requirements } = {}) {
    super(...arguments);
    this.name = name;
    this.requirements = (requirements || []).map((attrs) => {
      return new Requirement(attrs)
    });
  }

  get requiredProps() {
    return super.requiredProps.concat([
      ['name', 'String']
    ]);
  }
};
