'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const CharacterFactory = require('../../factories/character_factory');
const CharacterHelper = require('../../../engine/helpers/character_helper');
const SchemaFactory = require('../../factories/schema_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('CharacterHelper', () => {
  describe('.getCharacterWithName', () => {
    it('should return undefined when none of the characters match', () => {
      const schema = SchemaFactory.default();
      expect(CharacterHelper.getCharacterWithName('Hodor', [], schema)).to.be.undefined;
    });

    it('should return the correct character when the name matches', () => {
      const glinda = CharacterFactory.default({ id: 'glinda', name: 'Glinda' });
      const schema = SchemaFactory.default({ characters: [ glinda ] });
      expect(CharacterHelper.getCharacterWithName(
        'glinda', [{ id: 'tinMan' }, { id: 'glinda' }], schema
      )).to.deep.eq(glinda);
    });

    it('should return the correct character when any of the alt names match', () => {
      const glinda = CharacterFactory.default({
        id: 'glinda', name: 'Glinda', aliases: ['G-Unit', 'Glinny the Witch']
      });
      const schema = SchemaFactory.default({ characters: [ glinda ] });
      expect(CharacterHelper.getCharacterWithName(
        'g unit', [{ id: 'tinMan' }, glinda], schema
      )).to.deep.eq(glinda);
    });

    it('should merge argument character attributes into schema character', () => {
      const schema = SchemaFactory.default({
        characters: [CharacterFactory.default({ id: 'glinda', name: 'Glinda' })]
      });
      const result = CharacterHelper.getCharacterWithName(
        'Glinda', [{ id: 'glinda', responseText: 'Holla!' }], schema
      );
      expect(result.name).to.eq('Glinda');
      expect(result.responseText).to.eq('Holla!');
    });
  });
});
