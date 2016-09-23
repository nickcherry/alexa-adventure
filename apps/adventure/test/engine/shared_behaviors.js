'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;

/***********************************************/
/* Configuration */
/***********************************************/

chai.config.truncateThreshold = 0; // Better reporting with deep equals

/***********************************************/
/* Tests / Exports */
/***********************************************/

module.exports.constructorAssignsProps = (klass, propKeys) => {
  describe(`as ConfigurableModel`, () => {
    describe('.constructor', () => {
      it('should assign the properties', () => {
        const attrs = propKeys.reduce((attrs, key) => {
          if (Array.isArray(key)) {
            attrs[key[0]] = key[1];
          } else {
            attrs[key] = `${ key } value`;
          }
          return attrs;
        }, {});

        const object = new klass(attrs);

        propKeys.forEach((key) => {
          if (Array.isArray(key)) {
            expect(object[key[0]]).to.deep.eq(key[2] || key[1]);
          } else {
            expect(object[key]).to.eq(`${ key } value`);
          }
        });
      });
    });
  });
};
