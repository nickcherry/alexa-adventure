'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = require('chai').expect;

const Requirement = require('../../engine/requirement');

/***********************************************/
/* Tests */
/***********************************************/

describe('Requirement', () => {
  require('./shared_behaviors').constructorAssignsProps(Requirement, [
    'itemId'
  ]);
});
