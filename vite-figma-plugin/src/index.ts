import type { Plugin } from "vite";
import * as fs from "fs";
import * as path from "path";
import { startCodeWatcher, triggerFigmaRefresh } from "./utils";
import {
  packageSync,
  emptyFolder,
  copyFilesRecursively,
  zipPackage,
} from "meta-bolt/dist/plugin-utils";
import { FigmaConfig } from "./types";

const tmp = "./.tmp";
const dist = "./dist";
const index = "./index.html";

export const figmaPluginInit = () => {
  fs.mkdirSync(tmp, { recursive: true });
  emptyFolder(tmp);
  startCodeWatcher();
};

export const figmaPlugin: (config: FigmaConfig, mode?: string) => Plugin = (
  config: FigmaConfig,
  mode?: string
) => ({
  name: "vite-figma-plugin",
  writeBundle() {
    setTimeout(() => {
      if (fs.existsSync(dist)) {
        emptyFolder(dist);
      } else {
        fs.mkdirSync(dist, { recursive: true });
      }
      //* write manifest
      fs.writeFileSync(
        path.join(dist, "manifest.json"),
        JSON.stringify(config.manifest, null, 2)
      );
      copyFilesRecursively(tmp, dist, () => {
        triggerFigmaRefresh(path.join(dist, index));
      });
    }, 100);
  },
  async closeBundle() {
    if (mode === "zip") {
      const zipDir = path.join(process.cwd(), "zip");
      const srcDir = path.join(process.cwd(), "dist");
      const name = `${config.manifest.name}_${config.version}`;
      await zipPackage(name, zipDir, srcDir, config.copyZipAssets, true);
    }
  },
});

const triggerHMR = () => {
  // No built-in way to trigger Vite's HMR reload from outside the root folder
  // Workaround will read and save index.html file for each panel to triggger reload
  console.log("Code Change");
  const txt = fs.readFileSync(index, { encoding: "utf-8" });
  fs.writeFileSync(index, txt, { encoding: "utf-8" });
};

let i = 0;
export const figmaCodePlugin: () => Plugin = () => ({
  name: "trigger-hmr",
  closeBundle() {
    const isDevMode = process.argv[3] === "--watch";
    if (isDevMode && i > 0) triggerHMR();
    i++;
  },
});

export const runAction = (opts: object, action: string) => {
  if (action === "dependencyCheck") {
    console.log("Checking Dependencies");
    packageSync();
  }
  process.exit();
};
