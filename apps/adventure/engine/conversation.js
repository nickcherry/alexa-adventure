"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const ConfigurableModel = require('./configurable_model');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Conversation extends ConfigurableModel {
  constructor({ id, playerResponses, text }) {
    super();
    this.id = id;
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
