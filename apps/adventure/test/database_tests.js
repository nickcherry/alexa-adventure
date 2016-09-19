'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;

const Database = require('../database');
const State = require('../engine/state');
const StateFactory = require('./factories/state_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(chaiAsPromised);

/***********************************************/
/* Private */
/***********************************************/

const db = new Database();

/***********************************************/
/* Tests */
/***********************************************/

describe('Database', () => {
  it('should list tables', () => {
    return db.listTables().then((data) => {
      expect(data.TableNames).to.exist
    });
  });

  it('should set and fetch state', (done) => {
    const userId = 'abc123';
    const state = StateFactory.default();
    state.setMapId('level_1', false);
    return db.setState(userId, state).then(() => {
      db.getState(userId).then((persistedState) => {
        expect(persistedState.mapId).to.eq(state.mapId);
        done();
      });
    });
  });

  it('should return null when no previous state exists', () => {
    const newState = new State();
    return expect(db.getState('xxx')).to.eventually.be.null;
  });
});
