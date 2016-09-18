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

  set mapId(mapId) {
    if (this.mapId) this._pushMapHistory(this.mapId);
    return this._data.mapId = mapId;
  }

  goToPreviousMap() {
    this._data.mapId = this._popMapHistory();
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
  /* Inventory */
  /***********************************************/

  get inventory() {
    return this._data.inventory || [];
  }

  addInventory(type, id) {
    _.tap(this.inventory, (inventory) => inventory.push({ type, id }));
  }

  hasInventory(type, id) {
    _.findWhere(this.inventory, { type, id });
  }

  /***********************************************/
  /* Serialization */
  /***********************************************/

  serialize() {
    return JSON.stringify({
      inventory: this.inventory,
      mapHistory: this.mapHistory,
      mapId: this.mapId,
    });
  }
};
