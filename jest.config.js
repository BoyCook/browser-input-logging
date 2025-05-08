/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@use-cases/(.*)$': '<rootDir>/src/application/use-cases/$1'
  }
}; 