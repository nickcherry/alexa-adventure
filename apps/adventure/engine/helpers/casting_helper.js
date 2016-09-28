'use strict';

/***********************************************/
/* Private */
/***********************************************/

const performCast = (item, klass) => {
  if (!item || item.constructor.name === 'String') return item;
  return item.constructor.name === klass.name ? item : new klass(item);
};

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class CastingHelper {
  static cast(obj, klass) {
    if (Array.isArray(obj)) return obj.map((item) => performCast(item, klass));
    return performCast(obj, klass);
  }
};
