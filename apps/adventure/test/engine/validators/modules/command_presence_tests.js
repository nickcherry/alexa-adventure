'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const IntentFactory = require('../../../factories/intent_factory');
const subject = require('../../../../engine/validators/modules/command_presence');
const SchemaFactory = require('../../../factories/schema_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests */
/***********************************************/

describe('commandPresence', () => {
  const shared = require('./shared_behaviors');
  const opts = { key: 'intents', command: 'launch' }
  shared.validatorModule('commandPresence', subject, undefined, opts);

  it('should throw an error when the key option is not specified', () => {
    const invoke = () => subject([], {}, { command: 'launch' });
    expect(invoke).to.throw('The `commandPresence` validation requires a `key` option');
  });


  it('should throw an error when the command option is not specified', () => {
    const invoke = () => subject([], {}, { key: 'intents' });
    expect(invoke).to.throw('The `commandPresence` validation requires a `command` option');
  });


  it('should not generate errors when command is present', () => {
    const intent = IntentFactory.default({ command: 'launch' });
    const schema = SchemaFactory.default({ id: 'dummyId', intents: [intent] });
    expect(subject([], schema, { key: 'intents', command: 'launch' })).to.deep.equal([]);
  });

  it('should generate errors when command is not present', () => {
    const intent = IntentFactory.default({ command: 'something_else' });
    const schema = SchemaFactory.default({ id: 'dummyId', intents: [intent] });
    expect(subject([], schema, { key: 'intents', command: 'launch' })).to.include(
      '`launch` command was not found for "intents" key of Schema with id "dummyId"'
    );
  });
});
