'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const arrayWithSize = require('./modules/array_with_size');
const noUnrecognizedKeys = require('./modules/no_unrecognized_keys');
const recognizedArrayOfModels = require('./modules/recognized_array_of_models');
const requiredProps = require('./modules/required_props');
const Validator = require('./validator');

/***********************************************/
/* Exports */
/***********************************************/

module.exports = class MapValidator extends Validator {
  get validators() {
    return [
      [
        noUnrecognizedKeys, {
          validKeys: [
            'characters',
            'connectedTo',
            'id',
            'introText',
            'items',
            'name',
            'requirements',
            'searchText'
          ]
        }
      ],
      [arrayWithSize, { key: 'connectedTo' }],
      [recognizedArrayOfModels, { arrayKey: 'characters', key: 'id', type: 'character', schema: this.opts.schema }],
      [recognizedArrayOfModels, { arrayKey: 'items', key: 'id', type: 'item', schema: this.opts.schema }],
      [recognizedArrayOfModels, { arrayKey: 'connectedTo', key: 'id', type: 'map', schema: this.opts.schema }],
      [recognizedArrayOfModels, { arrayKey: 'requirements', key: 'id', type: 'item', schema: this.opts.schema }],
      requiredProps
    ];
  }
};
