'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const aws = require('aws-sdk');
const Settings = require('./settings');

/***********************************************/
/* Configuration */
/***********************************************/

aws.config = new aws.Config(Settings.aws.config);

/***********************************************/
/* Private */
/***********************************************/

let db;

const execute = (dbFunc, ...args) => {
  if (!db) {
    db = new aws.DynamoDB({
      endpoint: new aws.Endpoint(Settings.aws.endpoint)
    });
  }
  return new Promise((resolve, reject) => {
    db[dbFunc](...args, (err, data) => err ? reject(err) : resolve(data));
  });
};

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Database {

  getState(userId) {
    // return execute('getItem', {
    //   TableName: 'adventureStates',
    //   Key: [{ userId: { 'S': userId } }]
    // });
    new Promise((resolve, reject) {
      resolve({});
    });
  }

  setState(userId, state) {
    // return execute('put', {
    //   TableName: 'adventureStates',
    //   Item: state
    // });
    new Promise(resolve, reject) {
      resolve(state);
    });
  }
}

