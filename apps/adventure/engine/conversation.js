"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Conversation extends ConfigurableModel {
  constructor({ playerResponses, text }) {
    super(...arguments);
    this.playerResponses = playerResponses;
    this.text = text;
  }

  get requiredProps() {
    return [
      'id',
      'text'
    ];
  }
}
