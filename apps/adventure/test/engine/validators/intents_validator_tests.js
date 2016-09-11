"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

/***********************************************/
/* Tests */
/***********************************************/

describe('IntentValidator', () => {
  const shared = require('./shared_behaviors');
  const validatorPath = '../../../engine/validators/intent_validator';
  [
    { method: 'recognizedCommand' },
    { method: 'requiredCommandArgs' },
    { method: 'requiredProps' },
    { method: 'requiredSlots' }
  ].forEach((behavior) => {
    shared[behavior.method](validatorPath, behavior.opts);
  });
});
