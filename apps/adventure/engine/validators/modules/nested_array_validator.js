'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, validator }) => {
  if (undefined === key) throw new Error('The `nestedArrayValidator` validation requires a `key` option');
  if (undefined === validator) throw new Error('The `nestedArrayValidator` validation requires a `validator` option');
  const nestedObject = object[key];
  if (!nestedObject) return errors;
  return Object.keys(nestedObject).reduce((errors, nestedObjectKey) => {
    return errors.concat(new validator(nestedObject[nestedObjectKey]).errors);
  }, errors);
};

