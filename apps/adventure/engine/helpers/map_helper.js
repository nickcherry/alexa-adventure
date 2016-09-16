'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MapHelper {
  static getConnectedMaps(map, schema) {
    return schema.lookupArray('map', map.connectedTo);
  }

  static getCurrentMap(state, schema) {
    return schema.lookup('map', state.mapId) || this.getInitialMap(schema);
  }

  static getDestination(name, currentMap, schema) {
    return _.find(this.getConnectedMaps(currentMap, schema), { name: name });
  }

  static getInitialMap(schema) {
    return schema.lookup('map', schema.initialMapId);
  }
};
