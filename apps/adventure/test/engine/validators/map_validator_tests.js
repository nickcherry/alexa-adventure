'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

/***********************************************/
/* Tests */
/***********************************************/

describe('MapValidator', () => {
  const shared = require('./shared_behaviors');
  const validatorPath = '../../../engine/validators/map_validator';
  [
    { method: 'arrayWithSize', opts: { key: 'connectedTo' } },
    { method: 'requiredProps' }
  ].forEach((behavior) => {
    shared[behavior.method](validatorPath, behavior.opts);
  });
});
