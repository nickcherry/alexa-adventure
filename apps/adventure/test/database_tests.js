'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const Database = require('../database');
const StateFactory = require('./factories/state_factory');

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
    state.mapId = 'level_1';
    db.setState(userId, state).then(() => {
      db.getState(userId).then((persistedState) => {
        expect(persistedState.mapId).to.eq(state.mapId);
        done();
      });
    });
  });
});
