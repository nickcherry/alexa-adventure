"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const Script = require('../engine/script');
const ScriptValidator = require('../engine/validators/script_validator');

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
    const scriptContent = fs.readFileSync(scriptPath).toString();
    const script = new Script(JSON.parse(scriptContent));
    const validator = new ScriptValidator(script);
    expect(validator.errors).to.deep.equal([]);
    expect(validator.isValid()).to.be.true;
  });
});
