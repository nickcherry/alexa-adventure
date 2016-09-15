'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, validator }) => {
  if (undefined === key) throw new Error('The `nestedHashValidator` validation requires a `key` option');
  if (undefined === validator) throw new Error('The `nestedHashValidator` validation requires a `validator` option');
  const nestedHash = object[key];
  if (!nestedHash) return errors;
  return _.reduce(nestedHash, (errors, nestedObject) => {
    return errors.concat(new validator(nestedObject).errors);
  }, errors);
};

