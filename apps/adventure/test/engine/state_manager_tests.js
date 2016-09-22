'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;
const sinonChai = require("sinon-chai");
const stub = require('sinon').stub;

const State = require('../../engine/state');
const StateFactory = require('../factories/state_factory');
const StateManager = require('../../engine/state_manager');
const StateManagerFactory = require('../factories/state_manager_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals
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
      const persistedState = StateFactory.default({ mapId: 'dungeon' });
      const getState = stub().returns(Promise.resolve(persistedState));
      const stateManager = StateManagerFactory.default({ getState });
      return stateManager.getState('abc123').then((state) => {
        expect(getState).to.have.been.calledWith('abc123');
        expect(state).to.deep.eq(persistedState);
      });
    });

    it('should return a new state when no previous state can be found', () => {
      const getState = stub().returns(Promise.resolve(null));
      const stateManager = StateManagerFactory.default({ getState });
      return stateManager.getState('abc123').then((state) => {
        expect(state).to.deep.eq(new State());
      });
    });
  });

  describe('setState', () => {
    it('should forward setState requests to the external/db method', () => {
      const newState = StateFactory.default({ mapId: 'dungeon' });
      const setState = stub().returns(Promise.resolve(newState));
      const stateManager = StateManagerFactory.default({ setState });
      return stateManager.setState('abc123', newState).then((state) => {
        expect(state).to.deep.eq(newState);
        expect(setState).to.have.been.calledWith('abc123', newState);
      });
    });
  });
});
