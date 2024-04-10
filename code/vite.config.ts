import { defineConfig } from "vite";
import type { Plugin } from "vite";
import type { OutputChunk } from "rollup";

const figmaCodePlugin: () => Plugin = () => ({
  name: "vite-figma-plugin",
  generateBundle(output, bundle) {
    // console.log("generateBundle");
    let code = "";
    Object.keys(bundle).forEach((file) => {
      const current = bundle[file] as OutputChunk;
      console.log("name:", current.fileName);
      code += current.code;
    });
    this.emitFile({
      type: "asset",
      fileName: "code.js",
      source: code,
    });
  },
  writeBundle() {
    console.log("writeBundle");
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [figmaCodePlugin()],
  build: {
    outDir: "dist",
  },
});
