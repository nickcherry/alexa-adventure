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
    const characterName = this._slot('character');
    const map = MapHelper.getCurrentMap(this.state, this.game.schema);
    const character = CharacterHelper.getCharacterWithName(characterName, map.characters, this.game.schema);
    if (character) {
      this._say(character.responseText);
      if (character.items && character.items.length) {
        const self = this;
        this.state.addItems(character.items.map((item) => item.id));
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
