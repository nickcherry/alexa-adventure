'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const Command = require('./command');
const ItemHelper = require('../helpers/item_helper');
const oxfordComma = require('../helpers/language_helper').oxfordComma;

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class ListInventoryCommand extends Command {
  perform() {
    const visibleItems = _.filter(this.state.items, { isVisible: true });
    if (visibleItems.length) {
      this.say(`You have ${ oxfordComma(_.map(visibleItems, 'name')) }`);
    } else {
      this.say("There's nothing in your inventory");
    }
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
