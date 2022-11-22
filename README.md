# Air Quality API

## Prerequisites

Any installation or set-up you need to do prior to checking this repository out and working on the codebase. This will
typically be one time development environment set-up and installation of IDEs, Docker or similar.

You have completed:

-   [Common development set-up](ansible/README.md)

## Setup

```
git clone git@gitlab.ros.gov.uk:mapping/starter/node-express-starter.git <app>
cd <app>
nvm use v14.17.4
yarn install
./git-hooks/git-hooks-setup
./develop.sh <client_id> <client_secret>
```

## Environment Variables

This project uses the `dotenv` package (https://www.npmjs.com/package/dotenv) to set default environmental variables in the .env file at the root of the project:

BASE_URL=https://gcp-europe-west1.api.carto.com \
CARTO_KEY=XXX \
PORT=3001

This defines the default base URL and port of the service if the values can't be derived from the environment it's deployed on.

## Dependencies

### Service Dependencies

The service requires these packages to operate successfully.

| Package            |                    Purpose                     | More                                             |
| ------------------ | :--------------------------------------------: | ------------------------------------------------ |
| compression        | Optimises performance by compressing responses | https://www.npmjs.com/package/compression        |
| dotenv             |     Defines default environment variables      | https://www.npmjs.com/package/dotenv             |
| express            |         Web app framework for Node.js          | https://expressjs.com/                           |
| express-actuator   |        Exposes metrics for health check        | https://www.npmjs.com/package/express-actuator   |
| helmet             |  Protects against common HTTP vulnerabilities  | https://www.npmjs.com/package/helmet             |
| node-fetch         |     Allows fetch API to be used in Node.js     | https://www.npmjs.com/package/node-fetch         |
| swagger-ui-express |            Serves API documentation            | https://www.npmjs.com/package/swagger-ui-express |
| winston            |                Enables logging                 | https://www.npmjs.com/package/winston            |

TODO: Protect against common HTTP vulnerabilities. Uses default settings.

### Dev Dependencies

These dependencies are for local development or testing only.

| Package      |                                    Purpose                                     | More                                       |
| ------------ | :----------------------------------------------------------------------------: | ------------------------------------------ |
| @babel/\*    |             Transpiles JavaScript to make it backwards-compatible              | https://babeljs.io/docs/en/                |
| @types/\*    |              Allows TypeScript compiler to recognise dependencies              | https://www.npmjs.com/package/@types/node  |
| concurrently |              Allows multiple npm commands to be run concurrently               | https://www.npmjs.com/package/concurrently |
| errorhandler |               Provides full stack error handling for development               | https://www.npmjs.com/package/errorhandler |
| eslint       |                        Defines style guide for new code                        | https://www.npmjs.com/package/eslint       |
| jest         |                                 Test framework                                 | https://www.npmjs.com/package/jest         |
| msw          |                          For mocking server responses                          | https://www.npmjs.com/package/msw          |
| nodemon      | Wraps node application and automatically restarts it when changes are detected | https://www.npmjs.com/package/nodemon      |
| npm-run-all  |              Allows multiple yarn commands to be run sequentially              | https://www.npmjs.com/package/npm-run-all  |
| prettier     |                           Automatically formats code                           | https://www.npmjs.com/package/prettier     |
| rimraf       |      Faster alternative to `rm -rf` command geared towards node projects       | https://www.npmjs.com/package/rimraf       |
| supertest    |                              Test HTTP assertions                              | https://www.npmjs.com/package/supertest    |
| ts-jest      |                   Allows Jest to be used to test TypeScript                    | https://www.npmjs.com/package/ts-jest      |
| ts-node      | Allows JavaScript dependencies to be transpiled using the TypeScript compiler  | https://www.npmjs.com/package/ts-node      |
| typescript   |             Allows TypeScript code to be compiled into JavaScript              | https://www.npmjs.com/package/typescript   |

## Build

Run on local environment and listen for changes:

```
./develop.sh <client_id> <client_secret>
```

Application will be available on http://localhost:3001

## Test

Check out further documentation [here](docs/TEST.md)

Run all tests in the tests folder:

```
yarn test
```

Run one test:

```
yarn run test-dev tests/app.spec.ts
```

Run integration tests:

```
./scripts/run_integration_tests.sh <client_id> <client_secret>
```

## Access URLs

The service will run on port 3001.

| URL                            |     Are      |
| ------------------------------ | :----------: |
| http://localhost:3001/health   | Health check |
| http://localhost:3001/metrics  |   Metrics    |
| http://localhost:3001/api-docs | Swagger docs |

## Commands

| Command          |                           Explanation                            |
| ---------------- | :--------------------------------------------------------------: |
| build            |                 Command for building javascript                  |
| build-all        |          Command for building javascript and typescript          |
| build-ts         |                 Command for building typescript                  |
| clean            |                   Cleaning destination folder                    |
| dev              |               Build in development mode and serve                |
| lint             |                     Check for linting errors                     |
| prod             |                Build in production mode and serve                |
| serve            |              Serve the files in destination folder               |
| serve-debug      |                              Debug                               |
| start            |              Start the server in destination folder              |
| test             |               Run all tests (unit and integration)               |
| test-dev         | Run speficic test file e.g. yarn run test-dev tests/test.spec.js |
| test-integration |             Run integration tests against real data              |
| transpile        |                       Transpile javascript                       |
| watch-debug      |                      Watch files and debug                       |
| watch-ts         |                      Watch typescript files                      |
| watch:dev        |                     Run in development mode                      |
| prettier-format  |                         Auto-format code                         |
