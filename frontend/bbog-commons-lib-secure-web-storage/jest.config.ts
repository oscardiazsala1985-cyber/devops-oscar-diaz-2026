/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageReporters: ['lcov', 'html'],
  setupFiles: ['jest-canvas-mock']
};
