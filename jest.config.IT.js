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
