'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const CharacterHelper = require('../helpers/character_helper');
const Command = require('./command');
const MapHelper = require('../helpers/map_helper');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class TalkCommand extends Command {
  perform() {
    const characterName = this.getSlot('character');
    const map = MapHelper.getCurrentMap(this.state, this.game.schema);
    const character = CharacterHelper.getCharacterWithName(characterName, map.characters, this.game.schema);
    if (character) {
      this.say(character.responseText);
      if (character.items && character.items.length) {
        const items = this.game.schema.lookupArray('item', character.items);
        this.state.addItems(items);
        this.setState(this.state);
      }
    } else {
      this.say(`${ characterName } isn't here`);
      this.game.onError(new Error(`TalkCommand: Character "${ characterName }" not found`), { severity: 'info' });
    }
  }

  static getRequiredSlots() {
    return ['character'];
  }

  static getRequiredCommandArgs() {
    return [];
  }
};
