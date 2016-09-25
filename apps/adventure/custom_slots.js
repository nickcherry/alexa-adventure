'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const colors = require('colors');
const fs = require('fs-extra');
const interpolate = require('./engine/helpers/interpolation_helper').interpolate;
const Schema = require('./engine/schema');
const Settings = require('./settings');

/***********************************************/
/* Generate Custom Slot Values */
/***********************************************/

const schemaPath = __dirname + '/schema.json';
const schema = new Schema(
  JSON.parse(
    interpolate(
      fs.readFileSync(schemaPath).toString(),
      Settings.schemaConstants
    )
  )
);

const logSlotValues = (slotName, schemaProp) => {
  console.log(`\n${ slotName.cyan.bold }`);
  Object.keys(schema[schemaProp]).forEach((key) => {
    console.log(schema[schemaProp][key].name.cyan);
  });
  console.log();
};

logSlotValues('AVAILABLE_CHARACTERS', 'characters');
logSlotValues('AVAILABLE_ITEMS', 'items');
logSlotValues('AVAILABLE_MAPS', 'maps');
