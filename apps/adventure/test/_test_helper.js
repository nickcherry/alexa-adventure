'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Database = require('../database');

/***********************************************/
/* Tests */
/***********************************************/

before(() => {
  const db = new Database();
  return new Promise((resolve, reject) => {
    db.doesStatesTableExist().then((result) => {
      if (result) return resolve();
      db.createStatesTable().then(resolve);
    });
  });
  return new Database().doesStatesTableExist();
});
