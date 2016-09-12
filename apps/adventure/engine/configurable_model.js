'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ConfigurableModel {

  constructor({ id } = {}) {
    this.id = id;
  }

  get requiredProps() {
    return [
      ['id', 'String']
    ]
  }

  get identity() {
    const className = this.constructor.name;
    if (this.id) {
      return `${ className } with id "${ this.id }"`;
    } else if (this.name) {
      return `${ className } with name "${ this.name }"`;
    } else {
      return `${ className } with json ${ JSON.stringify(this) }`;
    }
  }
};
