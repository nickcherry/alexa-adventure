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

  get mapId() {
    return this._data.mapId;
  }

  set mapId(mapId) {
    return this._data.mapId = mapId;
  }

  get mapHistory() {
    return this._data.mapHistory || [];
  }

  pushMapHistory(mapId) {
    return _.tap(this.mapHistory, (mapHistory) => mapHistory.push(mapId));
  }

  popMapHistory() {
    return this.mapHistory.pop();
  }

  get inventory() {
    return this._data.inventory || [];
  }

  addInventory(type, id) {
    _.tap(this.inventory, (inventory) => inventory.push({ type, id }));
  }

  hasInventory(type, id) {
    _.findWhere(this.inventory, { type, id });
  }

  serialize() {
    return JSON.stringify({
      mapId: this.mapId,
      inventory: this.inventory
    });
  }
};
