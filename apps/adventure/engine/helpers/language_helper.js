'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const levenshtein = require('fast-levenshtein');

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
    if (!str1 || !str2) return false;
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    return s1 === s2 || levenshtein.get(s1, s2) <= threshold;
  }
};
