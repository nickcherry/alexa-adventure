'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const LanguageHelper = require('./language_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MapHelper {
  static getConnectedMaps(map, schema) {
    return schema.lookupArray('map', map.connectedTo);
  }

  static getCurrentMap(state, schema) {
    return schema.lookup('map', state.mapId);
  }

  static getInitialMap(schema) {
    return schema.lookup('map', schema.initialMapId);
  }

  static getMapWithName(name, currentMap, schema) {
    return _.find(this.getConnectedMaps(currentMap, schema), (map) => {
      return LanguageHelper.areEqualish(name, map.name);
    });
  }
};
