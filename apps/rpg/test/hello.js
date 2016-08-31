"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');


/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;


/***********************************************/
/* Tests */
/***********************************************/

describe('hello', () => {
  describe('world', () => {
    it('should smile', () => {
      const expected = ':)';
      const actual = require('lodash').reverse('):'.split('')).join('')
      expect(expected).to.eq(actual)
    });
  });
});
