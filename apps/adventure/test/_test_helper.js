'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const colors = require('colors');
const Database = require('../database');

/***********************************************/
/* Tests */
/***********************************************/

before(() => {
  const db = new Database();
  let isResolved = false;

  const promise = new Promise((trulyResolve, reject) => {
    const resolve = () => {
      isResolved = true;
      trulyResolve();
    };

    setTimeout(() => {
      if (isResolved) return;
      console.error("\nIs Dynamo running? Maybe try `npm run dynamo`.\n".red.bold);
      throw new Error('Could not connect to database!');
    }, 1000);

    db.doesStatesTableExist().then((result) => {
      if (result) return resolve();
      else db.createStatesTable().then(resolve);
    });
  });

  return promise;
});
