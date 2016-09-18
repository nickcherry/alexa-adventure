'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class StateHelper {
  static ensureCurrentMap(state, schema) {
    console.log('I AM HERE')
    return schema.lookup('map', state.mapId);
  }
};
