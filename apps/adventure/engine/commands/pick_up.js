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
    const itemName = this.getSlot('item');
    const map = MapHelper.getCurrentMap(this.state, this.game.schema);
    const item = ItemHelper.getItemWithName(itemName, map.items, this.game.schema);
    if (item) {
      this.say(item.pickUpText);
      this.state.addItem(item);
      this.setState(this.state);
    } else {
      this.say(`${ itemName } isn't here`);
      this.game.onError(new Error(`PickUpCommand: Item "${ itemName }" not present in map`), { severity: 'info' });
    }
  }

  static getRequiredSlots() {
    return ['item'];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
