'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');
const ItemHelper = require('../helpers/item_helper');
const MapHelper = require('../helpers/map_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class PickUpCommand extends Command {
  perform() {
    const itemName = this._slot('item');
    const map = MapHelper.getCurrentMap(this.state, this.game.schema);
    const item = ItemHelper.getItemWithName(itemName, map.items, this.game.schema);
    if (item) {
      const self = this;
      this.state.addItem(item.id);
      this.game.stateManager.setState(this.req.userId, this.state).then(() => {
        self._say(item.pickUpText);
      }).catch(this.game.onError);
    } else {
      this._say(`${ itemName } isn't here`);
    }
  }

  static getRequiredSlots() {
    return ['item'];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
