'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const InterpolationHelper = require('../../../engine/helpers/interpolation_helper');

/***********************************************/
/* Private */
/***********************************************/

const interpolate = InterpolationHelper.interpolate;

/***********************************************/
/* Tests */
/***********************************************/

describe('InterpolationHelper', () => {
  describe('.interpolate', () => {
    it('should return the original string with placeholders removed when params are empty', () => {
      const str = 'Well hello there, {{ name }}. How are you on this fine {{ day }}?';
      expect(interpolate(str)).to.eq('Well hello there, . How are you on this fine ?');
    });
      it('should interpolate values', () => {
        const str = 'Well hello there, {{ name }}. How are you on this fine {{ day }}?';
        const params = { name: 'Bubba', day: 'Tuesday' };
        expect(interpolate(str, params)).to.eq(
          'Well hello there, Bubba. How are you on this fine Tuesday?'
        );
      });
  });
});
