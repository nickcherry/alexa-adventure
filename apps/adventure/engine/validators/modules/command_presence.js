'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, command } = {}) => {
  if (undefined === key) throw new Error('The `commandPresence` validation requires a `key` option');
  if (undefined === command) throw new Error('The `commandPresence` validation requires a `command` option');
  if (_.find(object[key], { command })) return errors;
  return errors.concat(`\`${ command }\` command was not found for "${ key }" key of ${ object.identity }`);
};
