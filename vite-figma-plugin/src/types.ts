import type { PluginManifest } from "./manifest-types";

export type { PluginManifest };

export type FigmaConfig = {
  manifest: PluginManifest;
  version: string;
  copyZipAssets: string[];
};
