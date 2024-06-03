import { defineConfig } from "vite";
import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess"; // BOLT_SVELTE_ONLY
import { viteSingleFile } from "vite-plugin-singlefile";
import { figmaPlugin, figmaPluginInit, runAction } from "vite-figma-plugin";

import { svelte } from "@sveltejs/vite-plugin-svelte"; // BOLT_SVELTE_ONLY
import react from "@vitejs/plugin-react"; // BOLT_REACT_ONLY
import vue from "@vitejs/plugin-vue"; // BOLT_VUE_ONLY

import { config } from "./figma.config";

const action = process.env.ACTION;
const mode = process.env.MODE;

if (action)
  runAction(
    {},
    // config,
    action
  );

figmaPluginInit();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // BOLT_REACT_ONLY
    vue(), // BOLT_VUE_ONLY
    svelte({ preprocess: sveltePreprocess({ typescript: true }) }), // BOLT_SVELTE_ONLY
    viteSingleFile(),
    figmaPlugin(config, mode),
  ],
  build: {
    assetsInlineLimit: Infinity,
    emptyOutDir: false,
    outDir: ".tmp",
  },
});
