'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

/***********************************************/
/* Tests */
/***********************************************/

describe('ItemValidator', () => {
  const shared = require('./shared_behaviors');
  const validatorPath = '../../../engine/validators/item_validator';
  [
    { method: 'requiredProps' }
  ].forEach((behavior) => {
    shared[behavior.method](validatorPath, behavior.opts);
  });
});
