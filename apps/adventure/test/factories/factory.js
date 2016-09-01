/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Factory {
  constructor() {
    throw new Error(`${ this.constructor.name } cannot be instantiated.`);
  }
}
