'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, schema } = {}) => {
  if (undefined === key) throw new Error('The `recognizedMap` validation requires a `key` option');
  if (undefined === schema) throw new Error('The `recognizedMap` validation requires a `schema` option');
  if (!schema.lookup || !object[key]) return errors;
  return _.castArray(object[key]).reduce((errors, mapId) => {
    return schema.lookup('map', mapId) ? errors : errors.concat(
      `"${ mapId }" is not a recognized map for ${ object.identity }`
    );
  }, errors);
};
