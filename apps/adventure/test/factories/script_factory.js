"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const Factory = require('./factory');
const fs = require('fs');
const Script = require('../../engine/script');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ScriptFactory extends Factory {
  static default({ characters, data, intents, items, maps } = {}) {
    data = data || {
      characters: [],
      intents: [],
      items: [],
      maps: []
    };
    if (!_.isUndefined(characters)) data.characters = characters;
    if (!_.isUndefined(intents)) data.intents = intents;
    if (!_.isUndefined(items)) data.items = items;
    if (!_.isUndefined(maps)) data.maps = maps;
    return new Script(data);
  }
  static fromFile(filename) {
    const path = `${ __dirname }/../files/${ filename }.json`;
    const data = JSON.parse(fs.readFileSync(path).toString());
    return this.default({ data });
  }
}
