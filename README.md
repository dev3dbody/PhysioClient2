# Project stack

- Latest create-react-app
- TypeScript
- Redux
- Eslint with AirBnb code style
- Prettier as GitHook
- MaterialUI (soon)

# Development

Initially and after avery package.json changes:

```bash
git submodule update --init --recursive
npm i
```

To run the app for everyday job:

```bash
npm run electron-dev
```

# Deployment

Project automatically deploys to:

- for Mac: https://physio-client-2.s3.eu-central-1.amazonaws.com/Physio+Client+2-0.1.BUILD_NUMBER.dmg
- for Windows: https://physio-client-2.s3.eu-central-1.amazonaws.com/Physio+Client+2+Setup+-0.1.BUILD_NUMBER.exe

( physio-client-2 bucket if for dev use only, and files are removed from there automatically after 30 days )

- set build.(mac|win|linux).bucket to proper AWS S3 Bucket
- set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env to user that has PutObject and PutObjectACL permissions on that bucket
- set CIRCLE_BUILD_NUM env to new version number (version will be set to 0.1.build_number, to change that edit cd.sh)
- run ./cd.sh with all this env in place

# E2E Testing

- build app with `npm run electron-pack`
- start e2e tests with `npm run e2e-test`

Test are based on Spectron, check out https://electronjs.org/spectron for more information.

## Hints

- if you want to hold execution to check something visually use `await wait(5)` to wait 5 seconds

## Important

Afrer each source change relevant to e2e tests (for example after adding data-cy markers) application must be rebuild with `npm run electron-pack`, and it takes some time to rebuild - so it's good practice to mark tested elements in advance to save time.
