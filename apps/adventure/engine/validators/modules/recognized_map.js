'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, schema } = {}) => {
  if (undefined === key) throw new Error('The `recognizedMap` validation requires a `key` option');
  if (undefined === key) throw new Error('The `recognizedMap` validation requires a `schema` option');
  if (!schema.lookup || schema.lookup('map', object[key])) return errors;
  return errors.concat(`"${ object[key] }" is not a recognized map for ${ object.identity }`);
};
