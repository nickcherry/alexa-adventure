"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const Script = require('../engine/script');

/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;

/***********************************************/
/* Tests */
/***********************************************/

describe('script.json', () => {
  it('should be valid', () => {
    const scriptPath = __dirname + '/../script.json';
    const script = new Script(JSON.parse(fs.readFileSync(scriptPath)));
    expect(script.isValid()).to.be.true
  });
});
