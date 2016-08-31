"use strict"

/***********************************************/
/* Settings */
/***********************************************/

module.change_code = 1;


/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const app = new alexa.app('adventure');
const bugsnag = require("bugsnag");

const Config = require('./config');


/***********************************************/
/* Skill */
/***********************************************/

bugsnag.register(Config.bugsnagApiKey);

bugsnag.autoNotify({ context: 'launch' }, () => {
  app.launch((req, res) => {
    res.say("Greeting, adventurer.");
  });
});

bugsnag.autoNotify({ context: 'intent#newGame' }, () => {
  app.intent('newGame', {}, (req, res) => {
    res.say("What is your name, adventurer?");
  });
});

bugsnag.autoNotify({ context: 'intent#setName' }, () => {
  app.intent('setName', {
    slots: {
      NAME: 'LITERAL'
    },
    utterances: [
      "my {name is|name's} {namePlaceholder|NAME}",
      "{namePlaceholder|NAME}"
    ]
  }, (req, res) => {
    const name = req.slot('NAME');
    if (name) {
      res.say(`And so it begins, ${ name }`);
    } else {
      res.say('Come again?');
    }
  });
});


/***********************************************/
/* Exports */
/***********************************************/

module.exports = app;
