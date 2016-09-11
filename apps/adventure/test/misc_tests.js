"use strict";

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const walkSync = require('walk-sync');

/***********************************************/
/* Private */
/***********************************************/

const rootPath = __dirname + '..';

/***********************************************/
/* Tests */
/***********************************************/

describe('all .js files', () => {
  const ROOT = __dirname + '/..';
  const USE_STRICT = '"use strict";';
  it(`should be start with ${ USE_STRICT }`, () => {
    walkSync(ROOT, {
      directories: false,
      globs: ['**/*.js'],
      ignore: ['node_modules', 'test']
    }).forEach((path) => {
      const contents = fs.readFileSync(`${ ROOT }/${ path }`).toString();
      expect(contents.indexOf('"use strict";')).to.eq(0,
        `the ${ path } file must begin with ${ USE_STRICT }`);
    });
  });
});
