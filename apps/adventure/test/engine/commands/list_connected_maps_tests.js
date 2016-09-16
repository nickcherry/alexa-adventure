'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

const sinonChai = require("sinon-chai");
const spy = require('sinon').spy;

const CommandFactory = require('../../factories/command_factory');
const ListConnectedMapsCommand = require('../../../engine/commands/list_connected_maps');
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

describe('ListConnectedMapsCommand', () => {
  describe('#perform', () => {
    it('should say the names of the maps connected to the current map', () => {
      const res = { say: spy() };
      CommandFactory.default({
        commandClass: ListConnectedMapsCommand,
        res: res,
        schema: SchemaFactory.default({
          maps: [
            MapFactory.default({
              id: 'ballroom',
              name: 'The Ballroom',
              connectedTo: ['masterBedroom', 'bathroom', 'closet']
            }),
            MapFactory.default({ id: 'masterBedroom', name: 'The Master Bedroom' }),
            MapFactory.default({ id: 'bathroom', name: 'The Bathroom' }),
            MapFactory.default({ id: 'closet', name: 'The Closet' })
          ]
        }),
        state: StateFactory.default({ mapId: 'ballroom' }),
      }).perform();
      expect(res.say).to.have.been.calledWithMatch(
        'You are near The Master Bedroom, The Bathroom, and The Closet'
      );
    });
  });
});
