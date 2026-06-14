const path = require("path");
const { spawn } = require("child_process");

const projectRoot = path.join(__dirname, "..");
const expoCli = path.join(projectRoot, "node_modules", "expo", "bin", "cli");
const args = process.argv.slice(2);
const commandArgs = args.length ? args : ["start"];

const child = spawn(process.execPath, [expoCli, ...commandArgs], {
  cwd: projectRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    __UNSAFE_EXPO_HOME_DIRECTORY: path.join(projectRoot, ".expo-home"),
    npm_config_cache: path.join(projectRoot, ".npm-cache"),
    EXPO_NO_TELEMETRY: "1"
  }
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

