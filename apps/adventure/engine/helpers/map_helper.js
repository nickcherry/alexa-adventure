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
    let schemaMap;
    return map.connectedTo.map((map) => {
      schemaMap = schema.lookup('map', map.id);
      return schemaMap ? Object.assign(schemaMap, map) : undefined;
    });
  }

  static getCurrentMap(state, schema) {
    return schema.lookup('map', state.mapId);
  }

  static getMapWithName(name, currentMap, schema) {
    return _.find(this.getConnectedMaps(currentMap, schema), { name: name });
  }

  static getInitialMap(schema) {
    return schema.lookup('map', schema.initialMapId);
  }
};
