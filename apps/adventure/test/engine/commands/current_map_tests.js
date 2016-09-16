'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinonChai = require("sinon-chai");
const spy = require('sinon').spy;

const CurrentMapCommand = require('../../../engine/commands/current_map');
const CommandFactory = require('../../factories/command_factory');
const MapFactory = require('../../factories/map_factory');
const SchemaFactory = require('../../factories/schema_factory');
const StateFactory = require('../../factories/state_factory');

/***********************************************/
/* Configuration */
/***********************************************/

chai.use(sinonChai);

/***********************************************/
/* Tests */
/***********************************************/

describe('CurrentMapCommand', () => {
  describe('#perform', () => {
    it('should say the current map name when one is defined', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: CurrentMapCommand,
        res: res,
        schema: SchemaFactory.default({
          maps: [
            MapFactory.default({ id: 'tutorial', name: 'The Tutorial' }),
            MapFactory.default({ id: 'dungeon', name: 'The Dungeon' })
          ]
        }),
        state: StateFactory.default({ mapId: 'dungeon' })
      }).perform();
      expect(res.say).to.have.been.calledWithMatch('You are currently in The Dungeon')
    });

    it('should say the initial map name when one is defined', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: CurrentMapCommand,
        res: res,
        schema: SchemaFactory.default({
          initialMapId: 'tutorial',
          maps: [
            MapFactory.default({ id: 'tutorial', name: 'The Tutorial' }),
            MapFactory.default({ id: 'dungeon', name: 'The Dungeon' })
          ]
        }),
        state: StateFactory.default()
      }).perform();
      expect(res.say).to.have.been.calledWithMatch('You are currently in The Tutorial');
    });
  });
});
