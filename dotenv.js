const fs = require("fs");
const dotenv = require("dotenv");

function updateEnv(pathToConfig) {
  const envConfig = dotenv.parse(fs.readFileSync(pathToConfig));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

updateEnv("./secrets/variables.env");
