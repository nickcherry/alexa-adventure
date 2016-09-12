'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key } = {}) => {
  if (undefined === key) throw new Error('The `keyPresence` validation requires a `key` option');
  if (undefined !== object[key]) return errors;
  return errors.concat(`The \`${ key }\` key must be present for ${ object.identity }`);
};
