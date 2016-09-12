'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const Character = require('./character');
const Intent = require('./intent');
const Item = require('./item');
const Map = require('./map');

/***********************************************/
/* Private */
/***********************************************/

let _characters, _intents, _intentsAsArray, _items, _maps;

const cast = (obj, klass) => {
  if (!obj) return obj;
  if (!Array.isArray(obj)) return new klass(obj);
  return obj.map((item) => new klass(item));
}

const keyById = (array) => _.keyBy(array, 'id');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Script {
  constructor(data = {}) {
    this._data = data;
  }

  get characters() {
    return _characters = _characters || keyById(cast(this._data.characters, Character));
  };

  get intents() {
    return _intents = _intents || keyById(cast(this._data.intents, Intent));
  }

  get intentsAsArray() {
    return _intentsAsArray = _intentsAsArray || _.values(this.intents);
  }

  get items() {
    return _items = _items || keyById(cast(this._data.items, Item));
  }

  get maps() {
    return _maps = _maps || keyById(cast(this._data.maps, Map));
  }
};
