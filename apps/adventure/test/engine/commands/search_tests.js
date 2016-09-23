'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinonChai = require("sinon-chai");
const spy = require('sinon').spy;

const CommandFactory = require('../../factories/command_factory');
const IntentFactory = require('../../factories/intent_factory');
const MapFactory = require('../../factories/map_factory');
const SchemaFactory = require('../../factories/schema_factory');
const SearchCommand = require('../../../engine/commands/search');
const StateFactory = require('../../factories/state_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('SearchCommand', () => {
  describe('#perform', () => {
    it('should say the search text for the current map', () => {
      const res = { say: spy() };
      const schema = SchemaFactory.default({
        maps: [{ id: 'dungeon', searchText: 'Just some bones and stuff'}]
      });
      const state = StateFactory.default({ mapId: 'dungeon' });
      CommandFactory.default({
        commandClass: SearchCommand,
        res: res,
        schema: schema,
        state: state
      }).perform();
      expect(res.say).to.have.been.calledWithMatch(
        'Just some bones and stuff'
      );
    });
  });
});
