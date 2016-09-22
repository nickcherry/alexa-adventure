'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const micromustache = require('micromustache');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class InterpolationHelper {
  static interpolate(str, params = {}) {
    return micromustache.render(str, params);
  }
};
