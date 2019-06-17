#!/usr/bin/env bash

./node_modules/.bin/json -I -f package.json -e "this.version=\"0.1.$CIRCLE_BUILD_NUM\""
npm run dist

SLACK_MESSAGE="{\"type\":\"mrkdwn\", \"text\":\"New version available (0.1.$CIRCLE_BUILD_NUM): \n\n*Mac:*\nhttps://physio-client-2.s3.eu-central-1.amazonaws.com/Physio+Client+2-0.1.$CIRCLE_BUILD_NUM.dmg\n\n*Windows:*
https://physio-client-2.s3.eu-central-1.amazonaws.com/Physio+Client+2+Setup+-0.1.$CIRCLE_BUILD_NUM.exe\"}"
curl -X POST -H 'Content-type: application/json' --data "$SLACK_MESSAGE" https://hooks.slack.com/services/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
