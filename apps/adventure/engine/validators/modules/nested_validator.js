'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, validator }) => {
  if (undefined === key) throw new Error('The `nestedValidator` validation requires a `key` option');
  if (undefined === validator) throw new Error('The `nestedValidator` validation requires a `validator` option');
  const nestedObject = object[key];
  return nestedObject ? errors.concat(new validator(nestedObject).errors) : errors;
};

