'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const levenshtein = require('fast-levenshtein');
const string = require('string');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class LanguageHelper {

  static oxfordComma(items) {
    if (!items) return;
    else if (!items.length) return '';
    else if (items.length === 1) return items[0];
    else if (items.length === 2) return items.join(' and ');
    else {
      return items.slice(0, items.length - 1).join(', ') +
        ', and ' + items[items.length - 1];
    }
  }

  static areEqualish(str, others, threshold = 3) {
    if (!str || !others) return false;
    const normStr = LanguageHelper.normalize(str);
    return !!_.castArray(others).find((other) => {
      return levenshtein.get(normStr, LanguageHelper.normalize(other)) <= threshold;
    });
  }

  static normalize(str) {
    if (!str) return str;
    return string(str.toLowerCase()).stripPunctuation().trim().collapseWhitespace().s;
  }
};
