module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  testMatch: [
    "**/test/?(*.)+(spec|test).[tj]s?(x)"
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  }
};
