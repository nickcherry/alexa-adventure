'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const micromustache = require('micromustache');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class InterpolationHelper {
  static interpolate(str, params) {
    if (!params) {
      throw new Error('InterpolationHelper.interpolate requires a params argument.');
    }
    return micromustache.render(str, params);
  }
};
