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
    it('should handle an array of 2 correctly', () => {
      expect(LanguageHelper.oxfordComma(['lions', 'tigers'])).to.eq('lions and tigers');
    });
    it('should handle an array of 3 correctly', () => {
      expect(LanguageHelper.oxfordComma(['lions', 'tigers', 'bears']))
        .to.eq('lions, tigers, and bears');
    });
  });

  describe('.areEqualish', () => {
    it('should return false when either of the strings are undefined', () => {
      expect(LanguageHelper.areEqualish(undefined, 'banana')).to.be.false;
      expect(LanguageHelper.areEqualish('apple', undefined)).to.be.false;
    });
    context('when others is a string', () => {
      it('should return true when both strings are equal (case-insensitive)', () => {
        expect(LanguageHelper.areEqualish('Chuck Norris', 'CHUCK NORRIS')).to.be.true
      });
      it('should return true when the levenshtein distance is less than or equal to the threshold (case-insensitive)', () => {
        expect(LanguageHelper.areEqualish('Chicken', 'CHIKHEN', 2)).to.be.true;
        expect(LanguageHelper.areEqualish('Chicken', 'CHIKHAN',3)).to.be.true;
      });
      it('should return false when the levenshtein distance is greater than the threshold (case-insensitive', () => {
        expect(LanguageHelper.areEqualish('Chicken', 'CHIKHAN', 2)).to.be.false;
      });
    });
    context('when others is an array', () => {
      it('should return true when the string is equal to any member of the array (case-insensitive)', () => {
        expect(LanguageHelper.areEqualish('Chuck Norris', ['Harry Potter', 'Chuck Norris', 'Ahnold'])).to.be.true
      });
      it('should return true when the levenshtein distance between the string and any of the array members is less than or equal to the threshold (case-insensitive)', () => {
        expect(LanguageHelper.areEqualish('Chicken', ['cow', 'CHIKHEN'], 2)).to.be.true;
        expect(LanguageHelper.areEqualish('Chicken', ['CHIKHAN', 'bear', 'pig'], 3)).to.be.true;
      });
      it('should return false when the levenshtein distance between the string and all of the array members is greater than the threshold (case-insensitive', () => {
        expect(LanguageHelper.areEqualish('Chicken', ['CHIKHAN', 'bear', 'pig'], 2)).to.be.false;
      });
    });
  });

  describe('.normalize', () => {
    it('should return undefined when the string is undefined', () => {
      expect(LanguageHelper.normalize()).to.be.undefined;
    });
    it('should downcase the string', () => {
      expect(LanguageHelper.normalize('Why so LOUD')).to.eq('why so loud');
    });
    it('should remove punctuation', () => {
      expect(LanguageHelper.normalize("well, isn't that nice!")).to.eq('well isnt that nice');
    });
    it('should trim and squeeze whitespace', () => {
      expect(LanguageHelper.normalize('   this is    just   ridic  ')).to.eq('this is just ridic');
    });
  });
});
