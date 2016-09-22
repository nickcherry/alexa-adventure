'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const Schema = require('../engine/schema');
const SchemaValidator = require('../engine/validators/schema_validator');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('schema.json', () => {
  it('should be valid', () => {
    const schemaPath = __dirname + '/../schema.json';
    const schemaContent = fs.readFileSync(schemaPath).toString();
    const schema = new Schema(JSON.parse(schemaContent));
    const validator = new SchemaValidator(schema);
    expect(validator.errors).to.deep.equal([]);
    expect(validator.isValid()).to.be.true;
  });
});
