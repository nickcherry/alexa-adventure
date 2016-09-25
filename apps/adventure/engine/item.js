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
  constructor() {
    super(...arguments);
    this.requirements = (this.requirements || []).map((attrs) => {
      return new Requirement(attrs)
    });
  }

  get requiredProps() {
    return super.requiredProps.concat([
      ['name', 'String'],
      ['isVisible', 'Boolean']
    ]);
  }
};
