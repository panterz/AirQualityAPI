## Configuration

### Embedded integration tests

jest.setup.js needs to be added for embedded integration tests where all the downstream requests are mocked:

```
// src/setupTests.js
import {server} from "./src/mocks/server";
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
```

The file needs to be included in the jest.config.js configuration as in the example below:

```
"setupFilesAfterEnv": ["./jest.setup.js"]
```

### Mocking Requests

[MSW](https://mswjs.io/) libray is used for mocking the downstream APIs

A new file is added to src/mocks called handler.js where all the mocking is handled.

Checkout [here](../src/mocks/handler.js) for some examples

### Integration tests

For this type of tests mocking of downstream requests needs to be ignored. A new jest.config.IT.js is added where the jest.setup.js is ignored:

```
module.exports = {
    "testEnvironment": "jest-environment-node",
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(js|jsx|ts)$": "ts-jest"
    },
    testMatch: [
        "**/integration-tests/**/*.spec.(ts|js)"
    ],
    "automock": false
};

```

A new command has been added to run these tests in isolation:

```
npm run test-integration
```

## Commands

Run all tests:

```
npm test
```

Run one test:

```
npm run test-dev tests/app.spec.ts
```

Run integration tests:

```
npm run test-integration
```
