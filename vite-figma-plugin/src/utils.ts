import { execSync, exec } from "child_process";
import * as fs from "fs";
import * as path from "path";

const triggerFigmaRefresh = (file: string) => {
  if (process.platform === "win32") {
    // Figma on Windows refresh isn't reliable without this
    execSync(`echo.>> ${file}`);
  } else if (process.platform === "darwin") {
    // Figma on Mac doesn't seem to need this for now
    // execSync(`touch ${file}`);
  }
};

export const copyFilesRecursively = (srcDir, destDir) => {
  fs.readdir(srcDir, { withFileTypes: true }, (err, items) => {
    if (err) {
      console.error("Error reading source directory:", err);
      return;
    }
    items.forEach((item) => {
      const srcPath = path.join(srcDir, item.name);
      const destPath = path.join(destDir, item.name);
      if (item.isDirectory()) {
        // Create the directory in the destination and recurse
        fs.mkdir(destPath, { recursive: true }, (err) => {
          if (err) {
            console.error(`Error creating directory ${destPath}:`, err);
          } else {
            copyFilesRecursively(srcPath, destPath);
          }
        });
      } else if (item.isFile()) {
        if (destPath.endsWith("manifest.json") && fs.existsSync(destPath)) {
          const srcText = fs.readFileSync(srcPath, "utf-8");
          const dstText = fs.readFileSync(destPath, "utf-8");
          if (srcText !== dstText) {
            console.log(`\nmanifest.json has changed. Hot Reload will break\n`);
          }
        }
        // Copy file to the destination directory
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${srcPath} to ${destPath}`);
      }
    });
    triggerFigmaRefresh(path.join(destDir, "index.html"));
  });
};

export const emptyFolder = (folder: string) => {
  fs.readdirSync(folder).forEach((file) => {
    const curPath = folder + "/" + file;
    if (fs.lstatSync(curPath).isDirectory()) {
      emptyFolder(curPath);
      fs.rmdirSync(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
};

const buildCode = (runner: string) => {
  const res = execSync(`${runner} buildcode`, {
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
