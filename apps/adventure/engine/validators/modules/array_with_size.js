'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key } = {}) => {
  if (undefined === key) throw new Error('The `arrayWithSize` validation requires a `key` option');
  if (Array.isArray(object[key]) && object[key].length) return errors;
  return errors.concat(`The "${ key }" key is not an array with length in ${ object.identity }`);
};
