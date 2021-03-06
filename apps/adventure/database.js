'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const aws = require('aws-sdk');
const State = require('./engine/state');
const Settings = require('./settings');

/***********************************************/
/* Configuration */
/***********************************************/

aws.config = new aws.Config(Settings.aws.config);

/***********************************************/
/* Private */
/***********************************************/

let db, docClient;

const dbExecute = (method, ...args) => {
  if (!db) {
    db = new aws.DynamoDB({
      endpoint: new aws.Endpoint(Settings.aws.endpoint)
    });
  }
  return new Promise((resolve, reject) => {
    db[method](...args, (err, data) => err ? reject(err) : resolve(data));
  });
};

const docClientExecute = (method, ...args) => {
  if (!docClient) {
    docClient = new aws.DynamoDB.DocumentClient({
      endpoint: new aws.Endpoint(Settings.aws.endpoint)
    });
  }
  return new Promise((resolve, reject) => {
    docClient[method](...args, (err, data) => err ? reject(err) : resolve(data));
  });
};

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Database {

  listTables() {
    return dbExecute('listTables');
  }

  doesStatesTableExist() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.listTables().then((data) => {
        resolve(_.includes(data.TableNames, Settings.aws.gameStatesTable));
      }).catch(reject);
    });
  }

  createStatesTable() {
    return dbExecute('createTable', {
      TableName: Settings.aws.gameStatesTable,
      KeySchema: [
        { AttributeName: 'UserId', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'UserId', AttributeType: 'S' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    });
  }

  describeStatesTable() {
    return dbExecute('describe', {
      TableName: Settings.aws.gameStatesTable
    });
  }

  deleteStatesTable() {
    return dbExecute('deleteTable', {
      TableName: Settings.aws.gameStatesTable
    });
  }

  getState(userId) {
    return docClientExecute('get', {
      TableName: Settings.aws.gameStatesTable,
      AttributesToGet: ['UserId', 'GameState'],
      Key: { UserId: userId }
    }).then((data) => {
      if (data.Item && data.Item.GameState) {
        return new State(JSON.parse(data.Item.GameState));
      } else {
        return null;
      }
    });
  }

  setState(userId, state) {
    return docClientExecute('put', {
      TableName: Settings.aws.gameStatesTable,
      Item: {
        UserId: userId,
        GameState: state.serialize()
      }
    }).then(() => {
      return state;
    });
  }
}
