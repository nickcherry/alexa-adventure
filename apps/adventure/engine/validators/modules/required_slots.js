"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const CommandLoader = require('../../commands/command_loader');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object) => {
  const commandClass = CommandLoader.get(object.command);
  if (!commandClass) return errors;
  const slots = object.slots || {};
  return commandClass.getRequiredSlots().reduce((errors, slot) => {
    if (slots[slot]) return errors;
    return errors.concat(`The \`${ slot }\` slot is required for ${ object.identity }`);
  }, errors);
}
