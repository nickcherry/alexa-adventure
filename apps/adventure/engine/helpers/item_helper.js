'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const LanguageHelper = require('./language_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ItemHelper {
  static getItemWithName(name, items, schema) {
    return _.find(schema.lookupArray('item', items), (item) => {
    	const names = _.compact([item.name].concat(item.altNames));
    	return LanguageHelper.areEqualish(name, names);
    });
  }
};
