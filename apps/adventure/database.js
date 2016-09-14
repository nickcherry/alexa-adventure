'use strict';

/***********************************************/
/* Imports */
/***********************************************/

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
        resolve(data.TableNames.includes(Settings.aws.gameStatesTable));
      }).catch(reject);
    });
  }

  createStatesTable() {
    // const self = this;
    // return new Promise((resolve, reject) => {
    //   self.doesStatesTableExist().then((result) => {
    //     if (result) {
    //       self.describeStatesTable().then(resolve).catch(reject);
    //     } else {
    //       dbExecute('createTable', {
    //         TableName: Settings.aws.gameStatesTable,
    //         KeySchema: [
    //           { AttributeName: 'UserId', KeyType: 'HASH' }
    //         ],
    //         AttributeDefinitions: [
    //           { AttributeName: 'UserId', AttributeType: 'S' }
    //         ],
    //         ProvisionedThroughput: {
    //           ReadCapacityUnits: 1,
    //           WriteCapacityUnits: 1
    //         }
    //       }).then(resolve).catch(reject);
    //     }
    //   }).catch(reject);
    // });
    return dbExecute('createTable', {
      TableName: Settings.aws.gameStatesTable,
      KeySchema: [
        { AttributeName: 'UserId', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'UserId', AttributeType: 'S' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
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
      return new State(
        data.Item && data.Item.GameState ? JSON.parse(data.Item.GameState) : {}
      );
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
