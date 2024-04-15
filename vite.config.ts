import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import { figmaPlugin } from "vite-figma-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), viteSingleFile(), figmaPlugin()],
  build: {
    emptyOutDir: false,
    outDir: ".tmp",
  },
});
