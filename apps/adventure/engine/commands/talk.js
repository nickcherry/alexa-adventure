'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const CharacterHelper = require('../helpers/character_helper');
const Command = require('./command');
const ItemHelper = require('../helpers/item_helper');
const MapHelper = require('../helpers/map_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class TalkCommand extends Command {
  perform() {
    const characterName = this._slot('character');
    const map = MapHelper.getCurrentMap(this.state, this.game.schema);
    const character = CharacterHelper.getCharacterWithName(characterName, map.characters, this.game.schema);
    if (character) {
      this._say(character.responseText);
      if (character.items && character.items.length) {
        const items = ItemHelper.assembleItems(character.items, this.game.schema);
        this.state.addItems(items);
        this.game.stateManager.setState(
          this.req.userId, this.state
        ).catch(this.game.onError);
      }
    } else {
      this._say(`${ characterName } isn't here`);
    }
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
