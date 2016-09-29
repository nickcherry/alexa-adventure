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
      const requirement = RequirementFactory.default({
        item: { id: 'plunger' }
      });
      const state = StateFactory.default({ items: [plunger] });
      expect(RequirementHelper.isSatisfied(requirement, state)).to.be.true
    });
    it('should return false when requirement is not satisfied', () => {
      const requirement = RequirementFactory.default({
        item: { id: 'plunger' }
      });
      const state = StateFactory.default({ items: [] });
      expect(RequirementHelper.isSatisfied(requirement, state)).to.be.false
    });
  });

  describe('.getUnsatisfied', () => {
    it('should return an empty array when all requirements are satisfied', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' })
      const requirement1 = RequirementFactory.default({ item: { id: 'plunger' }});
      const requirement2 = RequirementFactory.default({ item: { id: 'sword' }});
      const requirements = [requirement1, requirement2];
      const state = StateFactory.default({ items: [sword, plunger] });
      expect(RequirementHelper.getUnsatisfied(requirements, state)).to.deep.eq([]);
    });

    it('should return the unsatisfied requirements', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' })
      const requirement1 = RequirementFactory.default({ item: { id: 'plunger' }});
      const requirement2 = RequirementFactory.default({ item: { id: 'sword' }});
      const requirements = [requirement1, requirement2];
      const state = StateFactory.default({ items: [plunger] });
      expect(RequirementHelper.getUnsatisfied(requirements, state)).to.deep.eq([requirement2]);
    });
  });

  describe('.getDeniedText', () => {
    it('should return undefined when all requirements are satisfied', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' })
      const requirement1 = RequirementFactory.default({ item: { id: 'plunger' }});
      const requirement2 = RequirementFactory.default({ item: { id: 'sword' }});
      const requirements = [requirement1, requirement2];
      const state = StateFactory.default({ items: [sword, plunger] });
      expect(RequirementHelper.getDeniedText(requirements, state)).to.be.undefined;
    });

    it('should return the first unsatisfied requirement\'s denied text', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' })
      const requirement1 = RequirementFactory.default({ item: { id: 'plunger' }});
      const requirement2 = RequirementFactory.default({ item: { id: 'sword' }, deniedText: 'Need a sword, dude' });
      const requirements = [requirement1, requirement2];
      const state = StateFactory.default({ items: [plunger] });
      expect(RequirementHelper.getDeniedText(requirements, state)).to.deep.eq('Need a sword, dude');
    });
  });
});
