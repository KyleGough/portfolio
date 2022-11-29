const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@image/(.*)$': '<rootDir>/public/img/$1',
    '^@mocks/(.*)$': '<rootDir>/utilities/mocks/$1',
    '^@utilities/(.*)$': '<rootDir>/utilities/$1'
  }
};

module.exports = createJestConfig(customJestConfig);
