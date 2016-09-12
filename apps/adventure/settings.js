'use strict';

/***********************************************/
/* Imports */
/***********************************************/

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
      endpoint: 'http://localhost:4567'
    };
  }
};