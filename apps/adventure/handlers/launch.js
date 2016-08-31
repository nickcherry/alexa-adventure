module.exports = (app) => {
  app.launch((req, res) => {
    res.say("Greeting, adventurer.");
  }
};
