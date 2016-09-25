'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const Character = require('../../engine/character');
const Item = require('../../engine/item');
const Map = require('../../engine/map');
const Requirement = require('../../engine/requirement');

/***********************************************/
/* Tests */
/***********************************************/

describe('Map', () => {
  require('./shared_behaviors').constructorAssignsProps(Map, [
    'characters',
    'connectedTo',
    'id',
    'introText',
    'items',
    'name',
    'requirements',
    'searchText'
  ]);
});
