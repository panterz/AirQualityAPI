module.exports = {
    "testEnvironment": "jest-environment-node",
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
