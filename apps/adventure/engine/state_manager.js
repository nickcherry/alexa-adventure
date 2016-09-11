"use strict";

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class StateManager {
  constructor({ getState, setState } = {}) {
    if (!getState || !setState) {
      throw new Error([
        'The StateManager constructor requires two key arguments: ',
        'getState and setState'
      ].join(''));
    }
    this.getState = getState;
    this.setState = setState;
  }
}
