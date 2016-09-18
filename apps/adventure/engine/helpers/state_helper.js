'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class StateHelper {
  static ensureCurrentMap(state, schema) {
    return schema.lookup('map', state.mapId);
  }
};
