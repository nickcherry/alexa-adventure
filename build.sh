#!/bin/bash

SCHEMA_PATH=`realpath $0`
ROOT=`dirname $SCHEMA_PATH`

APP_DIR="$ROOT/apps/adventure/"
TEMP_APP_DIR="$ROOT/.temp_app_dir"
TARGET_FILE="$ROOT/build.zip"
WHITELISTED_FILES="*.js *.json node_modules"

# Only allow build if tests are green
npm test >/dev/null
TESTS_RESULT=$?
if [ $TESTS_RESULT -ne 0 ]; then
  echo "Tests failed, aborting build"
  exit 1
fi

# Remove existing zip file
rm $TARGET_FILE

# Copy source files to temporary app dir
cp -r $APP_DIR $TEMP_APP_DIR

# Navigate to the temporary app dir
cd $TEMP_APP_DIR

# Remove tests
rm -rf tests

# Remove any existing packages
rm -rf node_modules

# Reinstall production packages only
npm install --production

# Overwrite environment
echo "'use strict'; module.exports = 'production';" > "env.js"

# Zip the app contents
zip -r $TARGET_FILE $WHITELISTED_FILES

# Remove temporary app dir
rm -rf $TEMP_APP_DIR
