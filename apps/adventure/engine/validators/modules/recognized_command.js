"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const CommandLoader = require('../../commands/command_loader');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object) => {
  if (CommandLoader.get(object.command)) return errors;
  return errors.concat(`\"${ object.command }\" is not a recognized command for ${ object.identity }`);
};
