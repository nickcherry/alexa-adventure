"use strict"

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Validator {

  constructor(object) {
    this.object = object;
  }

  get errors() {
    if (!this._errors) {
      const object = this.object;
      this._errors = this.validators.reduce((errors, validator) => {
        return validator(errors, object);
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
}
