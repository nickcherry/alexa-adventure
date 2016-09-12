'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object) => {
  if (!object.commandClass) return errors;
  const commandArgs = object.commandArgs || {};
  return object.commandClass.getRequiredCommandArgs().reduce((errors, arg) => {
    if (undefined !== commandArgs[arg]) return errors;
    return errors.concat(`The \`${ arg }\` commandArg is required for ${ object.identity }`);
  }, errors);
};
