#!/bin/bash

SCRIPT_PATH=`realpath $0`
ROOT=`dirname $SCRIPT_PATH`

APP_DIR="$ROOT/apps/adventure/"
TEMP_APP_DIR="$ROOT/.temp_app_dir"
TARGET_FILE="$ROOT/build.zip"
WHITELISTED_FILES="*.js *.json node_modules"


# Remove existing zip file
rm $TARGET_FILE

# Copy source files to temporary app dir
cp -r $APP_DIR $TEMP_APP_DIR

# Overwrite environment
echo "module.exports = 'production';" > "$TEMP_APP_DIR/env.js"

# Zip the app contents
cd $TEMP_APP_DIR
zip -r $TARGET_FILE $WHITELISTED_FILES

# Remove temporary app dir
rm -rf $TEMP_APP_DIR
