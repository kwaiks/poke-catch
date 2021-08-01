module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    '^assets/(.*)$':  '<rootDir>/src/assets/$1',
    '^styles/(.*)$':  '<rootDir>/src/styles/$1',
    '^config/(.*)$':  '<rootDir>/src/config/$1',
    '^components/(.*)$':  '<rootDir>/src/components/$1',
    '^gql/(.*)$':  '<rootDir>/src/gql/$1',
    '^utils/(.*)$':  '<rootDir>/src/utils/$1',
    '^context/(.*)$':  '<rootDir>/src/context/$1',
    '^pages/(.*)$':  '<rootDir>/src/pages/$1',
  }
};