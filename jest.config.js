module.exports = {
    "testEnvironment": "jest-environment-node",
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(js|jsx|ts)$": ["ts-jest", {tsconfig: "tsconfig.json"}]
    },
    testMatch: [
        "**/tests/**/*.spec.(ts|js)"
    ],
    "automock": false,
    "setupFilesAfterEnv": ["./jest.setup.js"]
};
