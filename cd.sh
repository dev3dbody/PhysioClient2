#!/usr/bin/env bash

./node_modules/.bin/json -I -f package.json -e "this.version=\"0.1.$CIRCLE_BUILD_NUM\""
npm run dist
