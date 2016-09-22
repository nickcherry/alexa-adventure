'use strict';

/***********************************************/
/* Imports */
/***********************************************/

const colors = require('colors');
const exec = require('sync-exec');
const fs = require('fs-extra');
const path = require('path');
const s3 = require('s3');
const Settings = require('./settings');

/***********************************************/
/* Settings */
/***********************************************/

const PROJECT_ROOT = `${ __dirname }/../..`;
const APP_ROOT = __dirname;
const TEMP_APP_ROOT = `${ APP_ROOT }/temp_app_container`;
const TARGET_BUILD_FILE = `${ APP_ROOT }/build.zip`;
const ASSETS_DIR = `${ APP_ROOT }/assets`;

/***********************************************/
/* Helpers */
/***********************************************/

const log = (emoji, msg) => {
  console.log(` ${ emoji }  `, msg.grey, "\n");
};

const error = (err) => {
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'.red);
  console.error('\n', err.red.bold, '\n');
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n'.red);
  process.exit(1);
};

/***********************************************/
/* Deployment */
/***********************************************/

if (fs.existsSync(TARGET_BUILD_FILE)) {
  log('🚽', 'Removing build file from previous deploy')
  fs.unlinkSync(TARGET_BUILD_FILE);
}

if (fs.existsSync(TEMP_APP_ROOT)) {
  log('🚽', 'Removing temporary app directory from previous deploy');
  fs.removeSync(TEMP_APP_ROOT);
}

log('🍐', 'Verifying that tests are green');
if (exec('cd PROJECT_ROOT; npm test').status !== 0) {
  error('Tests aren\'t green; fix those and try again!');
}

log('🏠', 'Creating temporary app directory');
fs.mkdirpSync(TEMP_APP_ROOT);

log('🔑', 'Copying json files to temporary app directory');
fs.copySync(`${ APP_ROOT }/package.json`, `${ TEMP_APP_ROOT }/package.json`);
fs.copySync(`${ APP_ROOT }/schema.json`, `${ TEMP_APP_ROOT }/schema.json`);
fs.copySync(`${ APP_ROOT }/secrets.json`, `${ TEMP_APP_ROOT }/secrets.json`);

log('🎪', 'Transpiling javascript with Babel');
const babel = (args) => {
  const result = exec(`cd ${ APP_ROOT }; babel ${ args }`);
  if (result.status !== 0) {
    error(`There was a problem transpiling the javascript! ${ result.stdout }`);
  }
}
babel(`*.js --out-dir ${ TEMP_APP_ROOT }`);
babel(`engine --out-dir ${ TEMP_APP_ROOT }/engine`);

log('🏋', 'Installing production dependencies');
exec(`cd ${ TEMP_APP_ROOT }; npm install --production`);

log('🎯', 'Overwriting env.js for production');
const envContent = "'use strict'; module.exports = 'production';";
fs.writeFileSync(`${ TEMP_APP_ROOT }/env.js`, envContent);

log('🗜', 'Zipping target build file');
let zip = exec(`cd ${ TEMP_APP_ROOT }; zip -r ${ TARGET_BUILD_FILE } .`);

if (fs.existsSync(TEMP_APP_ROOT)) {
  log('🚽', 'Removing temporary app directory');
  fs.removeSync(TEMP_APP_ROOT);
}

log('🚀', 'Uploading build file to S3');
const s3Client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  s3Options: {
    accessKeyId: Settings.aws.config.accessKeyId,
    secretAccessKey: Settings.aws.config.secretAccessKey,
    region: Settings.aws.config.region,
  }
});

const buildUploader = s3Client.uploadFile({
  localFile: TARGET_BUILD_FILE,
  s3Params: {
    Bucket: Settings.aws.applicationBucket,
    Key: path.basename(TARGET_BUILD_FILE)
  }
});

buildUploader.on('error', function(err) {
  error(`Error uploading build to S3: ${ err.stack }`);
});

buildUploader.on('end', function() {
  log('🎵', 'Syncing audio assets with S3');
  const assetUploader = s3Client.uploadDir({
    localDir: ASSETS_DIR,
    deleteRemoved: true,
    s3Params: {
      Bucket: Settings.aws.assetsBucket
    }
  });

  assetUploader.on('error', function(err) {
    console.error(`Error uploading assets to S3: ${ err.stack }`);
  });

  assetUploader.on('end', function() {
    log('🤘', 'The adventure is on.')
  });
});
