"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Factory = require('./factory');
const StateFactory = require('./state_factory');
const StateManager = require('../../engine/state_manager');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class StateManagerFactory extends Factory {
  static default({ getState, setState } = {}) {

    getState = getState || function(userId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(StateFactory.default()), 0);
      });
    };

    setState = setState || function(userId, data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(StateFactory.default()), 0);
      });
    };

    return new StateManager(getState, setState);
  }
}
