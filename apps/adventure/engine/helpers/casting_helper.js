'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CastingHelper {
  static cast(obj, klass) {
    if (!obj) return obj;
    if (Array.isArray(obj)) return obj.map((item) => new klass(item));
    return new klass(obj);
  }
};
