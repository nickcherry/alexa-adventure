"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const Character = require('./character');
const Intent = require('./intent');
const Item = require('./item');
const Map = require('./map');

/***********************************************/
/* Private */
/***********************************************/

const cast = (obj, klass) => {
  if (!obj) return obj;
  if (!Array.isArray(obj)) return new klass(obj);
  return obj.map((item) => new klass(item));
}

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Script {
  constructor(data = {}) {
    this._data = data;
  }

  get characters() {
    return this._castAndCache('characters', Character);
  };

  get intents() {
    return this._castAndCache('intents', Intent);
  }

  get items() {
    return this._castAndCache('items', Item);
  }

  get maps() {
    return this._castAndCache('maps', Map);
  }

  _castAndCache(dataKey, klass) {
    const selfKey = `_${ dataKey }`;
    return this[selfKey] = this[selfKey] || cast(this._data[dataKey], klass);
  }
}
