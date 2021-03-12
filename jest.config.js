module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  clearMocks: true,
  setupFilesAfterEnv: ['regenerator-runtime/runtime'],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
};