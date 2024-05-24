export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '\\.(test)\\.(ts|js)$',
  coverageReporters: ['text', 'lcov', 'html'],
};
