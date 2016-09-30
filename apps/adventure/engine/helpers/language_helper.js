'use strict';

/***********************************************/
/* Imports */
/***********************************************/

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

  static areEqualish(str1, str2, threshold = 3) {
    if (undefined === str1 || undefined === str2) return false;
    const norm1 = LanguageHelper.normalize(str1);
    const norm2 = LanguageHelper.normalize(str2);
    return norm1 === norm2 || levenshtein.get(norm1, norm2) <= threshold;
  }

  static normalize(str) {
    if (!str) return str;
    return string(str.toLowerCase()).stripPunctuation().trim().collapseWhitespace().s;
  }
};
