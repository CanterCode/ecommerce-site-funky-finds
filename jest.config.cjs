module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  moduleFileExtensions: ["js","jsx","ts","tsx","json","node"]
};
