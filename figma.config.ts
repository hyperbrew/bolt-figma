import type { FigmaConfig, PluginManifest } from "vite-figma-plugin/lib/types";
import { version } from "./package.json";

export const manifest: PluginManifest = {
  name: "Bolt Figma", // BOLT_DISPLAYNAME_REPLACE
  id: "co.bolt.figma", // BOLT_ID_REPLACE
  api: "1.0.0",
  main: "code.js",
  ui: "index.html",
  editorType: [
    "figma", // BOLT_FIGMA_ONLY
    "figjam", // BOLT_FIGJAM_ONLY
    "dev", // BOLT_FIGMADEV_ONLY
  ],
  documentAccess: "dynamic-page",
  networkAccess: {
    allowedDomains: ["*"],
    reasoning: "For accessing remote assets",
  },
};

const extraPrefs = {
  copyZipAssets: ["public-zip/*"],
};

export const config: FigmaConfig = {
  manifest,
  version,
  ...extraPrefs,
};
