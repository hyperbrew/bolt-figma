import { defineConfig } from "vite";
import type { Plugin } from "vite";
import type { OutputChunk } from "rollup";
import { resolve } from "path";

const figmaCodePlugin: () => Plugin = () => ({
  name: "vite-figma-plugin",
  generateBundle(output, bundle) {
    let files = Object.keys(bundle);
    if (files.length > 1) {
      throw this.error(
        "More than one file found in code.ts project. Check Vite Config settings"
      );
    }
    bundle[files[0]].fileName = "code.js";
    return;
  },
  writeBundle(res) {
    console.log("writeBundle", res);
    console.log("res.assetFileNames", res.assetFileNames);
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [figmaCodePlugin()],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {},
        entryFileNames: `code.js`,
      },
      input: "/src/code.ts",
    },
  },
});
