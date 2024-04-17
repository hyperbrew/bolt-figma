import type { Plugin } from "vite";
import * as fs from "fs";
import { copyFilesRecursively, emptyFolder, startCodeWatcher } from "./utils";

export const figmaPluginInit = () => {
  fs.mkdirSync("./.tmp", { recursive: true });
  emptyFolder("./.tmp");
  startCodeWatcher();
};

export const figmaPlugin: () => Plugin = () => ({
  name: "vite-figma-plugin",
  writeBundle() {
    setTimeout(() => {
      if (fs.existsSync("./dist")) {
        emptyFolder("./dist");
      } else {
        fs.mkdirSync("./dist", { recursive: true });
      }
      copyFilesRecursively("./.tmp", "./dist");
    }, 100);
  },
});

const triggerHMR = () => {
  // No built-in way to trigger Vite's HMR reload from outside the root folder
  // Workaround will read and save index.html file for each panel to triggger reload
  console.log("Code Change");
  const txt = fs.readFileSync("./index.html", { encoding: "utf-8" });
  fs.writeFileSync("./index.html", txt, { encoding: "utf-8" });
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
