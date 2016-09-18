'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const exec = require('sync-exec');
const expect = chai.expect;
const walkSync = require('walk-sync');

/***********************************************/
/* Tests */
/***********************************************/

describe('scripts/*.json', () => {
  it('should not produce errors', () => {
    let errorCount, intentCount, responseCount, result;
    walkSync(__dirname + '/../scripts', {
      directories: false,
      globs: ['**/*.json']
    }).forEach((path) => {
      result = exec(`npm run simulate --script=${ path }`).stdout;
      errorCount = (result.match(/EGADS, AN ERROR OCCURRED!/g) || []).length;
      intentCount = (result.match(/Intent =>/g) || []).length;
      responseCount = (result.match(/Response =>/g) || []).length;
      expect(errorCount).to.be.eq(0, `Errors occurred when simulating the ${ path } script`);
      expect(intentCount).to.be.above(0, `There should be at least one intent in the ${ path } script`);
      expect(intentCount).to.eq(responseCount, `There should be a response for every intent in the ${ path } script`);
    });
  });
});
