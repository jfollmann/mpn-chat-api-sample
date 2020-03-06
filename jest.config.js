// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Stop running tests after `n` failures
  bail: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.ts'],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  }
};
