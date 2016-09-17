'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;
const sinonChai = require("sinon-chai");
const stub = require('sinon').stub;

const StateFactory = require('../factories/state_factory');
const StateManager = require('../../engine/state_manager');
const StateManagerFactory = require('../factories/state_manager_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('StateManager', () => {
  describe('.constructor', () => {
    it('should throw an error when any arguments are missing', () => {
      const construct = () => new StateManager();
      expect(construct).to.throw(
        'The StateManager constructor requires two key arguments: getState and setState'
      );
    });
  });

  describe('getState', () => {
    it('should forward getState requests to the external/db method', () => {
      const stateManager = StateManagerFactory.default();
      const getState = stub(stateManager, 'getState', () => Promise.resolve())
      stateManager.getState('abc123');
      expect(getState).to.have.been.calledWith('abc123');
    });
    it('should forward setState requests to the external/db method', () => {
      const state = StateFactory.default({ mapId: 'dungeon' });
      const stateManager = StateManagerFactory.default();
      const setState = stub(stateManager, 'setState', () => Promise.resolve())
      stateManager.setState('abc123', state);
      expect(setState).to.have.been.calledWith('abc123', state);
    });
    xit('should return a new state when no previous state can be found', () => {

    });
  });
});
