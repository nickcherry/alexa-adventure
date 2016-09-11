"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

/***********************************************/
/* Tests */
/***********************************************/

describe('CharacterValidator', () => {
  const shared = require('./shared_behaviors');
  const validatorPath = '../../../engine/validators/character_validator';
  [
    { method: 'requiredProps' }
  ].forEach((behavior) => {
    shared[behavior.method](validatorPath, behavior.opts);
  });
});
