"use strict"

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object) => {
  return object.requiredProps.reduce((errors, prop) => {
    if (undefined != object[prop]) return errors;
    return errors.concat(`\`${ prop }\` is a required property for ${ object.identity }`);
  }, errors);
};
