/***********************************************/
/* Imports */
/***********************************************/

const Command = require('./command');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class NewGameCommand extends Command {
  perform() {
    this._say('And so it begins...');
    return true;
  }
}
