import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import { execSync, exec, spawn } from "child_process";
import type { Plugin } from "vite";
import fs, { copyFile, readFileSync, readdir } from "fs";
import path from "path";

const buildCode = (runner: string, exe: string) => {
  const res = execSync(`${runner} buildcode`, {
    encoding: "utf-8",
  });
  console.log(res.toString());
};

const devCode = (runner: string, exe: string) => {
  console.log("devCode");
  exec(`${runner} devcode`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

  // spawn equivalent

  // const child = spawn(runner, ["buildcode", "--watch"]);
  // child.stdout.on("data", (data) => {
  //   console.log(`stdout: ${data}`);
  // });
};

const startCodeWatcher = () => {
  console.log("buildStart");
  const exe = process.argv[1];
  const scriptMode = process.argv[3];
  const isDevMode = scriptMode === "--watch";
  console.log({ isDevMode, scriptMode });
  // if (isDevMode) {
  //   fs.watchFile("./.tmp/code.js", () => {
  //     console.log("code.ts changed");
  //     // this.generateBundle();
  //   });
  // }
  const runner = process.env.npm_config_user_agent.split("/")[0];
  const supportedRunners = ["npm", "yarn", "pnpm"];
  if (supportedRunners.indexOf(runner) === -1) {
    console.warn(`⚠️ Unsupported runner. May encounter issues: ${runner}`);
  }
  // return;
  try {
    buildCode(runner, exe);
    if (isDevMode) {
      devCode(runner, exe);
    }
  } catch (e) {
    console.log(e);
  }
};
startCodeWatcher();

const figmaPlugin: () => Plugin = () => ({
  name: "vite-figma-plugin",
  buildStart() {
    // this.addWatchFile("src-code/code.ts");
  },
  // async
  generateBundle() {
    // const code = readFileSync("./src/code.js", "utf-8");
    // this.emitFile({
    //   type: "asset",
    //   fileName: "code.js",
    //   source: code,
    // });
  },
  writeBundle() {
    const copyFilesRecursively = (srcDir, destDir) => {
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
                console.log(``);
                console.log(`manifest.json has changed. Hot Reload will break`);
                console.log(``);
              }
            }
            // Copy file to the destination directory
            fs.copyFile(srcPath, destPath, (err) => {
              if (err) {
                console.error(`Error copying file ${srcPath}:`, err);
              } else {
                console.log(`Copied ${srcPath} to ${destPath}`);
              }
            });
          }
        });
      });
    };
    setTimeout(() => {
      // fs.rmSync("./dist", { recursive: true });
      fs.mkdirSync("./dist", { recursive: true });
      copyFilesRecursively("./.tmp", "./dist");
    }, 100);
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), viteSingleFile(), figmaPlugin()],
  build: {
    emptyOutDir: false,
    outDir: ".tmp",
  },
});
