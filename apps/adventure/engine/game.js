class Game {
  constructor(options={}) {
    this.options = options;
  }

  serialize() {
    return JSON.stringify(this);
  }
}

module.exports = Game;
