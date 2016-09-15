'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const ConfigurableModelFactory = require('../../../factories/configurable_model_factory');
const Validator = require('../../../../engine/validators/validator');
const subject = require('../../../../engine/validators/modules/nested_hash_validator');

/***********************************************/
/* Tests */
/***********************************************/

describe('nestedHashValidator', () => {
  const shared = require('./shared_behaviors');
  const opts = { key: 'whatevs', validator: new Function() }
  shared.validatorModule('nestedHashValidator', subject, undefined, opts);

  it('should throw an error when the key option is not specified', () => {
    const invoke = () => subject([], undefined, { validator: new Function() });
    expect(invoke).to.throw('The `nestedHashValidator` validation requires a `key` option');
  });

  it('should throw an error when the validator option is not specified', () => {
    const invoke = () => subject([], undefined, { key: 'key' });
    expect(invoke).to.throw('The `nestedHashValidator` validation requires a `validator` option');
  });

  it('should not generate errors when nested items are valid', () => {
    const object = ConfigurableModelFactory.default();
    object.array = [{ name: 'Item A' }, { name: 'Item B' }];
    const validator = class HappyValidator extends Validator {
      get validators() {
        return [(errors, object) => errors];
      }
    };
    expect(subject([], object, { key: 'array', validator: validator })).to.deep.equal([]);
  });

  it('should generate errors when nested items are invalid', () => {
    const object = ConfigurableModelFactory.default();
    object.array = [{ name: 'Item A' }, { name: 'Item B' }];
    const validator = class UnhappyValidator extends Validator {
      get validators() {
        return [
          (errors, object) => {
            return errors.concat(`${ object.name } ain't right`);
          }
        ];
      }
    }
    const result = subject(['Some pre-existing error'], object, { key: 'array', validator: validator });
    expect(result).to.include("Some pre-existing error");
    expect(result).to.include("Item A ain't right");
    expect(result).to.include("Item B ain't right");
  });
});
