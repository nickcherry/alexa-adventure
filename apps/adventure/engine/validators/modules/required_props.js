"use strict"

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object) => {
  let key, type;

  return object.requiredProps.reduce((errors, rawProp) => {

    if (Array.isArray(rawProp)) {
      key = rawProp[0];
      type = rawProp[1];
    } else {
      key = rawProp;
      type = undefined;
    }

    if (undefined == object[key]) {
      return errors.concat(`\`${ key }\` is a required property for ${ object.identity }`);
    } else if (type && object[key].constructor.name != type) {
      return errors.concat(`\`${ key }\` must be of type ${ type } for ${ object.identity }`);
    } else {
      return errors;
    }

  }, errors);
};
