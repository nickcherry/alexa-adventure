'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const CastingHelper = require('../../../engine/helpers/casting_helper');
const ConfigurableModel = require('../../../engine/configurable_model');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('CastingHelper', () => {
  describe('.cast', () => {
    it('should return the original object when it is null or undefined', () => {
      expect(CastingHelper.cast(null)).to.be.null;
      expect(CastingHelper.cast()).to.be.undefined;
    });
    it('should cast a single object', () => {
      const result = CastingHelper.cast({ id: 'dummyId' }, ConfigurableModel);
      expect(result.constructor.name).to.eq('ConfigurableModel');
      expect(result.id).to.eq('dummyId');
    });
    it('should cast an array of objects', () => {
      const result = CastingHelper.cast([{ id: 'dummyId' }], ConfigurableModel);
      expect(result[0].constructor.name).to.eq('ConfigurableModel');
      expect(result[0].id).to.eq('dummyId');
    });
  });
});
