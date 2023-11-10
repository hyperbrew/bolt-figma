import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import { execSync } from "child_process";
import type { Plugin } from "vite";
import fs, { copyFile, readFileSync, readdir } from "fs";
import path from "path";

const figmaPlugin: () => Plugin = () => ({
  name: "vite-figma-plugin",
  generateBundle() {
    try {
      const res = execSync("yarn tsc ./src/code.ts", {
        encoding: "utf-8",
      });
      console.log(res.toString());
    } catch (e) {
      // console.log(e);
    }
    const code = readFileSync("./src/code.js", "utf-8");
    this.emitFile({
      type: "asset",
      fileName: "code.js",
      source: code,
    });
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
    fs.mkdirSync("./dist", { recursive: true });
    copyFilesRecursively("./.tmp", "./dist");
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), viteSingleFile(), figmaPlugin()],
  build: {
    outDir: ".tmp",
  },
});
