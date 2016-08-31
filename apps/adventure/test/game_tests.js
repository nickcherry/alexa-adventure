"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const Game = require('../engine/game');


/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;


/***********************************************/
/* Tests */
/***********************************************/

describe('Game', () => {
  describe('serialize', () => {
    it('should return a deserializable string', () => {
      const jsonString = new Game().serialize();
      const deserialized = JSON.parse(jsonString);
      expect(deserialized).to.be.an('object')
    });
  });
});
