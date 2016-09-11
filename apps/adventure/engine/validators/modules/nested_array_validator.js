"use strict";

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, validator }) => {
  if (undefined == key) throw new Error('The `nestedArrayValidator` validation requires a `key` option');
  if (undefined == validator) throw new Error('The `nestedArrayValidator` validation requires a `validator` option');
  if (!object[key]) return errors;
  return object[key].reduce((errors, nestedObject) => {
    return errors.concat(new validator(nestedObject).errors);
  }, errors);
};

