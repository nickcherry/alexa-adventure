'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const State = require('./state');

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
    this._getState = getState;
    this._setState = setState;
  }

  getState(userId) {
    return this._getState(userId).then((state) => {
      return state ? state : new State();
    })
  }

  setState(userId, state) {
    return this._setState(userId, state);
  }
};
