"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;


/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;


/***********************************************/
/* Tests */
/***********************************************/

describe('hello', () => {
  describe('world', () => {
    it('should turn that frown upside-down', () => {
      const expected = ':)';
      const actual = require('lodash').reverse('):'.split('')).join('')
      expect(expected).to.eq(actual)
    });
  });
});
