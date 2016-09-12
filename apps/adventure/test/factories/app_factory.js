'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const Factory = require('./factory');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class AppFactory extends Factory {
  static default({ name } = {}) {
    name = name || 'test_app';
    return new alexa.app(name);
  }
}
