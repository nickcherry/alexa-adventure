'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { arrayKey, key, value } = {}) => {
  if (undefined === arrayKey) throw new Error('The `keyValueInArrayPresence` validation requires an `arrayKey` option');
  if (undefined === key) throw new Error('The `keyValueInArrayPresence` validation requires a `key` option');
  if (undefined === value) throw new Error('The `keyValueInArrayPresence` validation requires a `value` option');
  const array = _.get(object, arrayKey);
  if (_.find(array, (item) => _.get(item, key) === value) )return errors;
  return errors.concat(`The value "${ value }" was not found for key "${ key }" in array "${ arrayKey }" of ${ object.identity }`);
};
