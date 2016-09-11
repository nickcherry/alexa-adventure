"use strict"

/***********************************************/
/* Imports */
/***********************************************/

console.log('here i am about ot require commadn loader');
const CommandLoader = require('../../commands/command_loader');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object) => {
  const commandClass = CommandLoader.get(object.command);
  if (!commandClass) return errors;
  const commandArgs = object.commandArgs || {};
  return commandClass.getRequiredCommandArgs().reduce((errors, arg) => {
    if (undefined != commandArgs[arg]) return errors;
    return errors.concat(`The \`${ arg }\` commandArg is required for ${ object.identity }`);
  }, errors);
};
