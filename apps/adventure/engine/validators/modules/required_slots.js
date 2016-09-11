"use strict";

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object) => {
  if (!object.commandClass) return errors;
  const slots = object.slots || {};
  return object.commandClass.getRequiredSlots().reduce((errors, slot) => {
    if (slots[slot]) return errors;
    return errors.concat(`The \`${ slot }\` slot is required for ${ object.identity }`);
  }, errors);
}
