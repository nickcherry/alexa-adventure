"use strict"

module.exports = (app) => {
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
};
