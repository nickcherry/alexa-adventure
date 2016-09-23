'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, value } = {}) => {
  if (undefined === key) throw new Error('The `keyValuePresence` validation requires a `key` option');
  if (undefined === value) throw new Error('The `keyValuePresence` validation requires a `value` option');
  if (_.get(object, key) === value) return errors;
  return errors.concat(`\`${ value }\` value was not found for "${ key }" key of ${ object.identity }`);
};
