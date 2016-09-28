'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const BaseModel = require('./base_model');
const cast = require('./helpers/casting_helper').cast;
const Character = require('./character');
const Intent = require('./intent');
const Item = require('./item');
const Map = require('./map');

/***********************************************/
/* Private */
/***********************************************/

const hash = (array) => _.keyBy(array, 'id');

const merge = (schemaModel, partialModel) => {
  const mergeWith = _.isString(partialModel) ? undefined : partialModel;
  if (!schemaModel && !mergeWith) return;
  return Object.assign({}, schemaModel, mergeWith);
};

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

  get initialMapId() {
    return this._data.initialMapId;
  }

  set initialMapId(initialMapId) {
    return this._data.initialMapId = initialMapId;
  }

  lookup(type, partialObject) {
    const id = _.get(partialObject, 'id', partialObject);
    switch(type.toLowerCase()) {
      case 'character':
        return cast(merge(this.characters[id], partialObject), Character);
      case 'item':
        return cast(merge(this.items[id], partialObject), Item);
      case 'map':
        return cast(merge(this.maps[id], partialObject), Map);
    }
  }

  lookupArray(type, partialObjects) {
    return partialObjects.map((partialObject) => this.lookup(type, partialObject));
  }

  _castHashAndCache(key, klass) {
    const cacheKey = `_${ key }`;
    return this[cacheKey] = this[cacheKey] || hash(cast(this._data[key], klass));
  }
};
