'use strict';

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Validator {

  constructor(object, opts = {}) {
    this.object = object;
    this.opts = opts;
  }

  get errors() {
    if (!this._errors) {
      const object = this.object;
      this._errors = this.validators.reduce((errors, validator) => {
        if (Array.isArray(validator)) {
          return validator[0](errors, object, validator[1]);
        } else {
          return validator(errors, object);
        }
      }, []);
    }
    return this._errors;
  }

  isValid() {
    return !this.errors.length;
  }

  validators() {
    throw new Error([
      `${ this.constructor.name } must implement a \`validators\` method, `,
      'which should return an array of validation modules.'
    ].join(''));
  }
};
