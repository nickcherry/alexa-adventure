'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const ItemFactory = require('../../factories/item_factory');
const RequirementHelper = require('../../../engine/helpers/requirement_helper');
const RequirementFactory = require('../../factories/requirement_factory');
const StateFactory = require('../../factories/state_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('RequirementHelper', () => {
  describe('.isSatisfied', () => {
    it('should return true when requirement is satisfied', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const requirement = RequirementFactory.default({ itemId: 'plunger' });
      const state = StateFactory.default({ items: [plunger] });
      expect(RequirementHelper.isSatisfied(requirement, state)).to.be.true
    });
    it('should return false when requirement is not satisfied', () => {
      const requirement = RequirementFactory.default({ itemId: 'plunger' });
      const state = StateFactory.default({ items: [] });
      expect(RequirementHelper.isSatisfied(requirement, state)).to.be.false
    });
  });

  describe('.filterUnsatisfied', () => {
    it('should return an empty array when all requirements are satisfied', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' })
      const requirement1 = RequirementFactory.default({ itemId: 'plunger' });
      const requirement2 = RequirementFactory.default({ itemId: 'sword' });
      const requirements = [requirement1, requirement2];
      const state = StateFactory.default({ items: [sword, plunger] });
      expect(RequirementHelper.filterUnsatisfied(requirements, state)).to.deep.eq([]);
    });

    it('should return the unsatisfied requirements', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' })
      const requirement1 = RequirementFactory.default({ itemId: 'plunger' });
      const requirement2 = RequirementFactory.default({ itemId: 'sword' });
      const requirements = [requirement1, requirement2];
      const state = StateFactory.default({ items: [plunger] });
      expect(RequirementHelper.filterUnsatisfied(requirements, state)).to.deep.eq([requirement2]);
    });
  });
});
