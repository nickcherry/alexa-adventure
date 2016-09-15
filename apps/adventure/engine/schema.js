'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const BaseModel = require('./base_model');
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

const hash = (array) => _.keyBy(array, 'id');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Schema extends BaseModel {
  constructor(data = {}) {
    super(...arguments);
    this._data = data;
  }

  get characters() {
    return this._castHashAndCache('characters', Character);
  };

  get intents() {
    return this._castHashAndCache('intents', Intent);
  }

  get items() {
    return this._castHashAndCache('items', Item);
  }

  get maps() {
    return this._castHashAndCache('maps', Map);
  }

  lookup(type, id) {
    switch(type.toLowerCase()) {
      case 'character': return this.characters[id];
      case 'item': return this.items[id];
      case 'map': return this.maps[id];
    }
  }

  _castHashAndCache(key, klass) {
    const cacheKey = `_${ key }`;
    return this[cacheKey] = this[cacheKey] || hash(cast(this._data[key], klass));
  }
};
