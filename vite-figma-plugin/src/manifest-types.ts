//* Refer to docs: https://www.figma.com/plugin-docs/manifest/`

export interface NetworkAccess {
  allowedDomains: string[];
  reasoning?: string;
  devAllowedDomains?: string[];
}

export interface Parameter {
  name: string;
  key: string;
  description?: string;
  allowFreeform?: boolean;
  optional?: boolean;
}

export type ManifestMenuItem =
  | {
      name: string;
      command: string;
      parameters?: Parameter[];
      parameterOnly?: boolean;
    }
  | { separator: true }
  | { name: string; menu: ManifestMenuItem[] };

export type ManifestRelaunchButton = {
  command: string;
  name: string;
  multipleSelection?: boolean;
};

export interface CodegenLanguage {
  label: string;
  value: string;
}

export interface CodegenPreference {
  itemType: "unit" | "select" | "action";
  scaledUnit?: string;
  defaultScaleFactor?: number;
  default?: boolean;
  includedLanguages?: string[];
  propertyName?: string;
  label?: string;
  options?: { label: string; value: string; isDefault?: boolean }[];
}

export type PluginPermissionType =
  | "currentuser"
  | "activeusers"
  | "fileusers"
  | "payments"
  | "teamlibrary";

export interface PluginManifest {
  name: string;
  id: string;
  api: string;
  main: string;
  ui?: string | { [key: string]: string };
  documentAccess?: "dynamic-page";
  networkAccess?: NetworkAccess;
  parameters?: Parameter[];
  parameterOnly?: boolean;
  editorType?: ("figma" | "figjam" | "dev")[];
  menu?: ManifestMenuItem[];
  relaunchButtons?: ManifestRelaunchButton[];
  enableProposedApi?: boolean;
  enablePrivatePluginApi?: boolean;
  build?: string;
  permissions?: PluginPermissionType[];
  capabilities?: ("textreview" | "codegen" | "inspect" | "vscode")[];
  codegenLanguages?: CodegenLanguage[];
  codegenPreferences?: CodegenPreference[];
}
