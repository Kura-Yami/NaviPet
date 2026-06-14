const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const memoizeOneShim = path.resolve(__dirname, "shims", "memoize-one.js");
const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "memoize-one") {
    // Metro can miss react-native-web's nested memoize-one package on Windows/OneDrive.
    return {
      type: "sourceFile",
      filePath: memoizeOneShim
    };
  }

  return defaultResolveRequest
    ? defaultResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
