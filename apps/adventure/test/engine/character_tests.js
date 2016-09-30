'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const Character = require('../../engine/character');

/***********************************************/
/* Tests */
/***********************************************/

describe('Character', () => {
  require('./shared_behaviors').constructorAssignsProps(Character, [
  	'aliases',
    'id',
    'name'
  ]);
});
