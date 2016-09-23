'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const Item = require('../../engine/item');

/***********************************************/
/* Tests */
/***********************************************/

describe('Item', () => {
  require('./shared_behaviors').constructorAssignsProps(Item, [
    'id',
    'name'
  ]);
});
