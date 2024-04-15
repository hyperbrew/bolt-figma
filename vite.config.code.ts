import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: ".tmp",
    rollupOptions: {
      output: {
        manualChunks: {},
        entryFileNames: `code.js`,
      },
      input: "./src-code/code.ts",
    },
  },
});
