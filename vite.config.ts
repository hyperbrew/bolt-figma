import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import { execSync } from "child_process";
import type { Plugin } from "vite";
import { readFileSync } from "fs";

const figmaPlugin: () => Plugin = () => ({
  name: "vite-figma-plugin",
  generateBundle() {
    console.log("generateBundle");
    try {
      const res = execSync("yarn tsc ./src/code.ts", {
        encoding: "utf-8",
      });
      console.log(res.toString());
    } catch (e) {
      console.log(e);
    }
    const code = readFileSync("./src/code.js", "utf-8");
    this.emitFile({
      type: "asset",
      fileName: "code.js",
      source: code,
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), viteSingleFile(), figmaPlugin()],
});
