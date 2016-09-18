'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class StateHelper {
  static ensureCurrentMap(state, schema) {
    let map, mapId;
    if (map = schema.lookup('map', state.mapId)) return map;
    while(mapId = state.goToPreviousMap()) {
      if (map = schema.lookup('map', mapId)) return map;
    }
    state.mapId = schema.initialMapId;
    return schema.lookup('map', state.mapId);
  }
};
