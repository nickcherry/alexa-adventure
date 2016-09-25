'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { arrayKey, key, schema, type } = {}) => {
  if (undefined === arrayKey) throw new Error('The `recognizedArrayOfModels` validation requires an `arrayKey` option');
  if (undefined === key) throw new Error('The `recognizedArrayOfModels` validation requires a `key` option');
  if (undefined === schema) throw new Error('The `recognizedArrayOfModels` validation requires a `schema` option');
  if (undefined === type) throw new Error('The `recognizedArrayOfModels` validation requires a `type` option');
  const array = _.get(object, arrayKey);
  if (!array) return errors;
  return array.reduce((errors, item) => {
    const id = _.get(item, key, key === null ? item : undefined);
    return schema.lookup(type, id) ? errors : errors.concat(
      `"${ id }" is not a recognized ${ type } in ${ arrayKey } array for ${ object.identity }`
    );
  }, errors);
};
