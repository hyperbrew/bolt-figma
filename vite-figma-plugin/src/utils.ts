import { execSync, exec } from "child_process";

export const triggerFigmaRefresh = (file: string) => {
  if (process.platform === "win32") {
    // Figma on Windows refresh isn't reliable without this
    execSync(`echo.>> ${file}`);
  } else if (process.platform === "darwin") {
    // Figma on Mac doesn't seem to need this for now
    // execSync(`touch ${file}`);
  }
};

const buildCode = (runner: string) => {
  const res = execSync(`${runner} run buildcode`, {
    encoding: "utf-8",
  });
  console.log(res.toString());
};

const devCode = (runner: string) => {
  exec(`${runner} devcode`, (err, stdout, stderr) => {
    if (err) return console.error(err);
    console.log(stdout);
  });
};

export const startCodeWatcher = () => {
  const exe = process.argv[1];
  const scriptMode = process.argv[3];
  const isDevMode = scriptMode === "--watch";
  const npmUserAgent = process.env.npm_config_user_agent || "";
  const runner = npmUserAgent.split("/")[0];
  const supportedRunners = ["npm", "yarn", "pnpm"];
  if (supportedRunners.indexOf(runner) === -1) {
    console.warn(`⚠️ Unsupported runner. May encounter issues: ${runner}`);
  }
  try {
    buildCode(runner);
    if (isDevMode) {
      devCode(runner);
    }
  } catch (e) {
    console.log(e);
  }
};
