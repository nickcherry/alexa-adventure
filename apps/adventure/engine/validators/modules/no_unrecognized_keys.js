'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { validKeys } = {}) => {
  if (undefined === validKeys) throw new Error('The `noUnrecognizedKeys` validation requires a `validKeys` option');
  return Object.keys(object).reduce((errors, key) => {
    return _.includes(validKeys, key) ? errors : errors.concat(
      `"${ key }" is not a valid key for ${ object.identity }`
    );
  }, errors);
};
