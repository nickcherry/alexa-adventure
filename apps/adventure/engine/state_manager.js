"use strict";

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class StateManager {
  constructor({ getState, setState } = {}) {
    if (!getState || !setState) {
      throw new Error([
        'The StateManager constructor requires two arguments: ',
        'a getState function and a setState function'
      ].join(''));
    }
    this.getState = getState;
    this.setState = setState;
  }
}
