'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const CommandFactory = require('../../factories/command_factory');
const IntentFactory = require('../../factories/intent_factory');
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
      const command = CommandFactory.default({ state });
      expect(RequirementHelper.isSatisfied(requirement, command)).to.be.true
    });

    it('should return false when requirement is not satisfied', () => {
      const requirement = RequirementFactory.default({
        item: { id: 'plunger' }
      });
      const state = StateFactory.default({ items: [] });
      const command = CommandFactory.default({ state });
      expect(RequirementHelper.isSatisfied(requirement, command)).to.be.false
    });
  });

  describe('.isSatisfiedForItem', () => {
    it('should return true when the item requirement is satisfied', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const requirement = RequirementFactory.default({
        item: { id: 'plunger' }
      });
      const state = StateFactory.default({ items: [plunger] });
      const command = CommandFactory.default({ state });
      expect(RequirementHelper.isSatisfiedForItem(requirement, command)).to.be.true
    });

    it('should return false when the item requirement is not satisfied', () => {
      const requirement = RequirementFactory.default({
        item: { id: 'plunger' }
      });
      const state = StateFactory.default({ items: [] });
      const command = CommandFactory.default({ state });
      expect(RequirementHelper.isSatisfiedForItem(requirement, command)).to.be.false
    });
  });

  describe('.isSatisfiedForCommandArgs', () => {
    it('should return true when the command arg requirement is satisfied', () => {
      const requirement = RequirementFactory.default({
        commandArgs: ['isClimbing']
      });
      const intent = IntentFactory.default({
        command: 'move',
        commandArgs: { isClimbing: true }
      });
      const command = CommandFactory.default({ intent });
      expect(RequirementHelper.isSatisfiedForCommandArgs(requirement, command)).to.be.true
    });

    it('should return false when the command arg requirement is not satisfied', () => {
      const requirement = RequirementFactory.default({
        commandArgs: ['isClimbing']
      });
      const intent = IntentFactory.default({ command: 'move' });
      const command = CommandFactory.default({ intent });
      expect(RequirementHelper.isSatisfiedForCommandArgs(requirement, command)).to.be.false
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
      const command = CommandFactory.default({ state });
      expect(RequirementHelper.getUnsatisfied(requirements, command)).to.deep.eq([]);
    });

    it('should return the unsatisfied requirements', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' })
      const requirement1 = RequirementFactory.default({ item: { id: 'plunger' }});
      const requirement2 = RequirementFactory.default({ item: { id: 'sword' }});
      const requirements = [requirement1, requirement2];
      const state = StateFactory.default({ items: [plunger] });
      const command = CommandFactory.default({ state });
      expect(RequirementHelper.getUnsatisfied(requirements, command)).to.deep.eq([requirement2]);
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
      const command = CommandFactory.default({ state });
      expect(RequirementHelper.getDeniedText(requirements, command)).to.be.undefined;
    });

    it('should return the first unsatisfied requirement\'s denied text', () => {
      const plunger = ItemFactory.default({ id: 'plunger', name: 'Plunger' })
      const sword = ItemFactory.default({ id: 'sword', name: 'Sword' })
      const requirement1 = RequirementFactory.default({ item: { id: 'plunger' }});
      const requirement2 = RequirementFactory.default({ item: { id: 'sword' }, deniedText: 'Need a sword, dude' });
      const requirements = [requirement1, requirement2];
      const state = StateFactory.default({ items: [plunger] });
      const command = CommandFactory.default({ state });
      expect(RequirementHelper.getDeniedText(requirements, command)).to.deep.eq('Need a sword, dude');
    });
  });
});
