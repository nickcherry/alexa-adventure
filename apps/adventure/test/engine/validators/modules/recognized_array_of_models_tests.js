'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const CharacterFactory = require('../../../factories/character_factory');
const MapFactory = require('../../../factories/map_factory');
const SchemaFactory = require('../../../factories/schema_factory');
const subject = require('../../../../engine/validators/modules/recognized_array_of_models');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('recognizedArrayOfModels', () => {
  const shared = require('./shared_behaviors');
  shared.validatorModule('recognizedArrayOfModels', subject, undefined, {
    arrayKey: 'map', type: 'character', key: 'id', schema: SchemaFactory.default()
  });

  const buildSchema = () => {
    return SchemaFactory.default({
      characters: [
        CharacterFactory.default({ id: 'tinMan', name: 'Tin Man' }),
        CharacterFactory.default({ id: 'scarecrow', name: 'Scarecrow' })
      ]
    })
  };

  const buildMap = (characters) => {
    return MapFactory.default({
      id: 'yellowBrickRoad',
      characters: characters
    })
  };

  it('should throw an error when the arrayKey option is not specified', () => {
    const invoke = () => subject([], undefined, { key: 'id', type: 'map', schema: {} });
    expect(invoke).to.throw('The `recognizedArrayOfModels` validation requires an `arrayKey` option');
  });

  it('should throw an error when the arrayKey option is not specified', () => {
    const invoke = () => subject([], undefined, { arrayKey: 'maps', type: 'map', schema: {} });
    expect(invoke).to.throw('The `recognizedArrayOfModels` validation requires a `key` option');
  });

  it('should throw an error when the schema option is not specified', () => {
    const invoke = () => subject([], undefined, { arrayKey: 'maps', type: 'map', key: 'initialMapId' });
    expect(invoke).to.throw('The `recognizedArrayOfModels` validation requires a `schema` option');
  });

  it('should throw an error when the type option is not specified', () => {
    const invoke = () => subject([], undefined, { arrayKey: 'maps', key: 'initialMapId', schema: {} });
    expect(invoke).to.throw('The `recognizedArrayOfModels` validation requires a `type` option');
  });

  context('with an array of objects', () => {
    it('should not generate errors when all models are recognized', () => {
      const map = buildMap([
        CharacterFactory.default({ id: 'scarecrow' }),
        CharacterFactory.default({ id: 'tinMan' }),
      ]);
      expect(subject([], map, {
        arrayKey: 'characters',
        key: 'id',
        type: 'character',
        schema: buildSchema()
      })).to.deep.equal([]);
    });

    it('should generate errors when models are not recognized', () => {
      const map = buildMap([
        CharacterFactory.default({ id: 'scarecrow' }),
        CharacterFactory.default({ id: 'hodor' }),
        CharacterFactory.default({ id: 'tinMan' }),
        CharacterFactory.default({ id: 'batman' })
      ]);
      const result = subject([], map, {
        arrayKey: 'characters',
        key: 'id',
        type: 'character',
        schema: buildSchema()
      });
      expect(result).to.have.length(2);
      expect(result).to.include.members([
        '"hodor" is not a recognized character in characters array for Map with id "yellowBrickRoad"',
        '"batman" is not a recognized character in characters array for Map with id "yellowBrickRoad"'
      ]);
    });
  });

  context('with an array of strings', () => {
    it('should not generate errors when all models are recognized', () => {
      const map = buildMap(['scarecrow', 'tinMan']);
        expect(subject([], map, {
        arrayKey: 'characters',
        key: null,
        type: 'character',
        schema: buildSchema()
      })).to.deep.equal([]);
    });

    it('should generate errors when models are not recognized', () => {
      const map = buildMap(['scarecrow', 'hodor', 'tinMan', 'batman']);
      const result = subject([], map, {
        arrayKey: 'characters',
        key: null,
        type: 'character',
        schema: buildSchema()
      });
      expect(result).to.have.length(2);
      expect(result).to.include.members([
        '"hodor" is not a recognized character in characters array for Map with id "yellowBrickRoad"',
        '"batman" is not a recognized character in characters array for Map with id "yellowBrickRoad"'
      ]);
    });
  });
});
