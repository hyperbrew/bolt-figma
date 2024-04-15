import { defineConfig } from "vite";
import fs from "fs";

const triggerHMR = () => {
  // No built-in way to trigger Vite's HMR reload from outside the root folder
  // Workaround will read and save index.html file for each panel to triggger reload
  console.log("Code Change");
  const txt = fs.readFileSync("./index.html", { encoding: "utf-8" });
  fs.writeFileSync("./index.html", txt, { encoding: "utf-8" });
};

let i = 0;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "trigger-hmr",
      closeBundle() {
        const isDevMode = process.argv[3] === "--watch";
        if (isDevMode && i > 0) triggerHMR();
        i++;
      },
    },
  ],
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
