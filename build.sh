#!/bin/bash

SCHEMA_PATH=`realpath $0`
ROOT=`dirname $SCHEMA_PATH`

APP_DIR="$ROOT/apps/adventure/"
TEMP_APP_DIR="$ROOT/.temp_app_dir"
TARGET_FILE="$ROOT/build.zip"

# Only allow build if tests are green
# npm test >/dev/null
# TESTS_RESULT=$?
# if [ $TESTS_RESULT -ne 0 ]; then
#   echo "Tests failed, aborting build"
#   exit 1
# fi

# Remove existing zip file (if it exists)
if [ -f $TARGET_FILE ]; then
  rm $TARGET_FILE
fi

# Create the temporary app dir (if it doesn't exist)
if [ ! -d $TEMP_APP_DIR ]; then
  mkdir $TEMP_APP_DIR
fi

# Copy json files to temporary app dir
cp $APP_DIR/{package.json,schema.json,secrets.json} $TEMP_APP_DIR

# Navigate to the app dir and transpile javascript
cd $APP_DIR
babel *.js --out-dir $TEMP_APP_DIR
babel engine --out-dir $TEMP_APP_DIR/engine

# Navigate to the temporary app dir
cd $TEMP_APP_DIR

# Reinstall production packages only
npm install --production

# Overwrite environment
echo "'use strict'; module.exports = 'production';" > "env.js"

# Zip the app contents
zip -r $TARGET_FILE .

# Remove temporary app dir
rm -rf $TEMP_APP_DIR
