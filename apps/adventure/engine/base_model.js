'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class BaseModel {
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
