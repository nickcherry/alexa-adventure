"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = (errors, object, { key, nestedKey } = {}) => {
  if (undefined == key) throw new Error('The `nestedKeyUniqueness` validation requires a `key` option');
  if (undefined == nestedKey) throw new Error('The `nestedKeyUniqueness` validation requires a `nestedKey` option');

  if (!object[key]) return errors;

  const counts = _.countBy(object[key], nestedKey);
  const dups = _.reduce(counts, (dups, count, nestedKeyVal) => {
    return count > 1 ? dups.concat(nestedKeyVal) : dups;
  }, []);

  return errors.concat(dups.map((dup) => {
    return `The \`${ nestedKey }\` key of \`${ key }\` must be unique for ${ object.identity }: "${ dup }" is not unique`
  }));
};
