'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class LaunchCommand extends Command {
  perform() {
    const musicUrl = 'https://s3.amazonaws.com/alexa-adventure-assets/launch_music.mp3';
    this._say(this._commandArg('text') + ` <audio src="${ musicUrl }" />`);
  }

  static getRequiredSlots() {
    return [];
  }

  static getRequiredCommandArgs() {
    return ['text'];
  }
};
