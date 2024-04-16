import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte"; // BOLT-FIGMA_SVELTE_ONLY
import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess"; // BOLT-FIGMA_SVELTE_ONLY
import { viteSingleFile } from "vite-plugin-singlefile";
import { figmaPlugin, figmaPluginInit } from "vite-figma-plugin";

figmaPluginInit();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({ preprocess: sveltePreprocess({ typescript: true }) }), // BOLT-FIGMA_SVELTE_ONLY
    ,
    viteSingleFile(),
    figmaPlugin(),
  ],
  build: {
    emptyOutDir: false,
    outDir: ".tmp",
  },
});
