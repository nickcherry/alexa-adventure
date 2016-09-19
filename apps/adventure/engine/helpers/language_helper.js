'use strict';

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
};
