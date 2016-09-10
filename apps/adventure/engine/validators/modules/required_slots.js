"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const CommandLoader = require('../../commands/command_loader');
require('colors');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object) => {
  const commandClass = CommandLoader.get(object.command);
  if (!commandClass) return errors;
  return commandClass.getRequiredSlots().reduce((errors, slot) => {
    if (object.slots.includes(slot)) return errors;
    return errors.concat(`The \`${ slot }\` slot is required for ${ object.identity }`);
  }, errors);
}
