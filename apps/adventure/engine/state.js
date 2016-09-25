'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class State {
  constructor(data = {}) {
    this._data = data;
  }

  /***********************************************/
  /* Maps */
  /***********************************************/

  get mapId() {
    return this._data.mapId;
  }

  setMapId(mapId, pushHistory) {
    if (_.isUndefined(pushHistory)) throw new Error('The `pushHistory` argument is required for `setMapId`');
    if (this.mapId && pushHistory) this._pushMapHistory(this.mapId);
    return this._data.mapId = mapId;
  }

  goToPreviousMap() {
    return this.setMapId(this._popMapHistory(), false);
  }

  get mapHistory() {
    return this._data.mapHistory || [];
  }

  _pushMapHistory(mapId) {
    return _.tap(this.mapHistory, (mapHistory) => mapHistory.push(mapId));
  }

  _popMapHistory() {
    return this.mapHistory.pop();
  }

  /***********************************************/
  /* Items */
  /***********************************************/

  get items() {
    return this._data.items || [];
  }

  addItem(item) {
    return _.tap(this.items, (items) => items.push(item));
  }

  addItems(items) {
    const self = this;
    items.forEach((item) => self.addItem(item));
    return this.items;
  }

  hasItemWithId(itemId) {
    return !!_.find(this.items, { id: itemId });
  }

  /***********************************************/
  /* Serialization */
  /***********************************************/

  serialize() {
    return JSON.stringify({
      items: this.items,
      mapHistory: this.mapHistory,
      mapId: this.mapId,
      updatedAt: new Date().valueOf()
    });
  }
};
