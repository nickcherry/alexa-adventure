"use strict"

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object) => {
  if (object.commandClass) return errors;
  return errors.concat(`\"${ object.command }\" is not a recognized command for ${ object.identity }`);
};
