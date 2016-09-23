'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const Map = require('../../engine/map');

/***********************************************/
/* Tests */
/***********************************************/

describe('Map', () => {
  require('./shared_behaviors').constructorAssignsProps(Map, [
    'connectedTo',
    'contains',
    'id',
    'name'
  ]);
});
