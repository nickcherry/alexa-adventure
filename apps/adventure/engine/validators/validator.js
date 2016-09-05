"use strict"

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class Validator {

  constructor(object) {
    this.object = object;
  }

  get errors() {
    throw new Error(`${ this.constructor.name } must implement an \`errors\` method, which should return an array.`);
  }

  isValid() {
    return !this.errors.length;
  }

  _validateRequiredProps(errors = []) {
    const self = this;
    return this.object.requiredProps.reduce((errors, prop) => {
      if (undefined == self.object[prop]) {
        errors = errors.concat([
          `\`${ prop }\` is a required property for ${ self._objectIdentity }`
        ]);
      }
      return errors;
    }, errors);
  }

  get _objectIdentity() {
    const className = this.object.constructor.name;
    if (this.object.id) {
      return `${ className } with id ${ this.object.id }`;
    } else if (this.object.name) {
      return `${ className } with name ${ this.object.name }`;
    } else {
      return `${ className } with json \`JSON.stringify(this.object)\``;
    }
  }
}
