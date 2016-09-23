'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

/***********************************************/
/* Tests / Exports */
/***********************************************/

module.exports.constructorAssignsProps = (klass, propKeys) => {
  describe(`as ConfigurableModel`, () => {
    describe('.constructor', () => {
      it('should assign the properties', () => {
        const attrs = propKeys.reduce((attrs, key) => {
          attrs[key] = `${ key } value`;
          return attrs;
        }, {});
        const object = new klass(attrs);
        propKeys.forEach((key) => {
          expect(object[key]).to.eq(`${ key } value`);
        });
      });
    });
  });
};
