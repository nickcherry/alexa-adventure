'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const env = require('./env');
const fs = require('fs');


/***********************************************/
/* Configuration */
/***********************************************/

const secrets = JSON.parse(fs.readFileSync(__dirname + '/secrets.json'));

module.exports = class Settings {

  static get bugsnagApiKey() {
    return secrets.bugsnagApiKey;
  }

  static get aws() {
    return {
      config: {
        region: 'us-east-1',
        accessKeyId: secrets.aws.accessKeyId,
        secretAccessKey: secrets.aws.secretAccessKey
      },
      endpoint: env === 'production' ?
        'https://dynamodb.us-east-1.amazonaws.com' :
        'http://localhost:4567',
      gameStatesTable: env === 'test' ?
        'TEST_GameStates' :
        'GameStates',
      applicationBucket: 'alexa-adventure',
      assetsBucket: 'alexa-adventure-assets'
    };
  }
};
