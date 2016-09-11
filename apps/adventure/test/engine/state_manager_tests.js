"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const StateManager = require('../../engine/state_manager');

/***********************************************/
/* Tests */
/***********************************************/

describe('StateManager', () => {
  describe('.constructor', () => {
    it('should throw an error when any arguments are missing', () => {
      const construct = () => new StateManager();
      expect(construct).to.throw(
        'The StateManager constructor requires two key arguments: getState and setState'
      );
    });
  });
});
