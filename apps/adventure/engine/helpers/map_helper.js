'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MapHelper {
  static getCurrentMap(state, schema) {
    return schema.lookup('map', state.mapId);
  }

  static getConnectedMaps(map, schema) {
    return schema.lookupArray('map', map.connectedTo);
  }

  static getDestination(name, currentMap, schema) {
    return _.find(this.getConnectedMaps(currentMap, schema), { name: name });
  }
};
