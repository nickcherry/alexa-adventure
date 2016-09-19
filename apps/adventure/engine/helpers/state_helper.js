'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class StateHelper {
  static ensureCurrentMap(state, schema) {
    let map = schema.lookup('map', state.mapId);
    if (map) return map;
    while(state.mapHistory.length) {
      map = schema.lookup('map', state.goToPreviousMap());
      if (map) return map;
    }
    state.setMapId(schema.initialMapId, false);
    return schema.lookup('map', state.mapId);
  }
};
