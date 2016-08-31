module.exports = (app) => {
  app.intent('newGame', {}, (req, res) => {
    res.say("What is your name, adventurer?");
  });
};
