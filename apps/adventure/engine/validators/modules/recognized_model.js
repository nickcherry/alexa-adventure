'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, schema, type } = {}) => {
  if (undefined === key) throw new Error('The `recognizedModel` validation requires a `key` option');
  if (undefined === schema) throw new Error('The `recognizedModel` validation requires a `schema` option');
  if (undefined === type) throw new Error('The `recognizedModel` validation requires a `type` option');
  const id = _.get(object, key);
  if (!id) return errors;
  return schema.lookup(type, id) ? errors : errors.concat(
    `"${ id }" is not a recognized ${ type } for ${ object.identity }`
  );
};
