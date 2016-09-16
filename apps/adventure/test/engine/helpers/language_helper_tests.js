'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const LanguageHelper = require('../../../engine/helpers/language_helper');

/***********************************************/
/* Tests */
/***********************************************/

describe('LanguageHelper', () => {
  describe('.oxfordComma', () => {
    it('should handle undefined gracefully', () => {
      expect(LanguageHelper.oxfordComma()).to.be.undefined;
    });
    it('should handle an empty array correctly', () => {
      expect(LanguageHelper.oxfordComma([])).to.eq('');
    });
    it('should handle an array of 1 correctly', () => {
      expect(LanguageHelper.oxfordComma(['lions'])).to.eq('lions')
    });
    it('should handle an array of 1 correctly', () => {
      expect(LanguageHelper.oxfordComma(['lions', 'tigers'])).to.eq('lions and tigers');
    });
    it('should handle an array of 1 correctly', () => {
      expect(LanguageHelper.oxfordComma(['lions', 'tigers', 'bears']))
        .to.eq('lions, tigers, and bears');
    });
  });
});
