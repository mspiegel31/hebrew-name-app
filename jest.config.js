module.exports = {
  // Use the default CRA test environment
  testEnvironment: 'jsdom',
  
  // Transform files with babel-jest
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Setup files after environment is set up
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Module name mapper for handling imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
  ],

  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
}; 