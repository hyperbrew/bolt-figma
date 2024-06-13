<img src="src/assets/bolt-figma-darkmode.svg" alt="Bolt Figma" title="Bolt Figma" width="400" />

A lightning-fast boilerplate for building Figma Plugins in Svelte, React, or Vue built on Vite + TypeScript + Sass

![npm](https://img.shields.io/npm/v/bolt-figma)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/hyperbrew/bolt-figma/blob/master/LICENSE)
[![Chat](https://img.shields.io/badge/chat-discord-7289da.svg)](https://discord.gg/PC3EvvuRbc)

## Features

- Lightning Fast Hot Reloading on changes
- Setup with TypeScript Definitions for Figma in Frontend, Backend, and Manifest
- Optimized Build Size
- Easy Smart Bundling in Frontend UI and Backend Code contexts
- Spin a up a new project in Svete, React, or Vue
- Select apps including Figma (Design Mode), Figma (Dev Mode), or FigJam
- Easily configure in figma.config.ts
- Easy Package to Zip archive with sidecar assets
- GitHub Actions ready-to-go for Zip Releases

## Backers

Huge thanks to our backers who have made this project possible!

### Founding Backers

_Founding backers have made substantial contribution to the project at the start which has made this project possible._

<a href="https://figma.com/" target="_blank">
<img src="https://cdn.sanity.io/images/g3so7nt7/production/6cb43009e94a67554c68fb50b9363a0aa68f3d23-418x200.png?w=1000&h=1000&fit=max" alt="Figma" title="Figma" width="300" /></a>

...

### Feature Backers

_Feature backers have sponsored individual features that have made this project better for the whole community._

<a href="https://battleaxe.co/" target="_blank">
<img src="https://battleaxe.dev/servile/logotype_lightgrey.png" alt="Battle Axe" title="Battle Axe" width="150" /></a>

...

If you're interested in supporting this open-source project, please [contact the Hyper Brew team](https://hyperbrew.co/contact/).

## Support

### Free Support

If you have questions with getting started using Bolt Figma, feel free to ask and discuss in our free Discord community [Discord Community](https://discord.gg/PC3EvvuRbc).

### Paid Support

If your team is interested in paid consulting or development with Bolt Figma, please [contact the Hyper Brew team](https://hyperbrew.co/contact/). More info on our [Custom Plugin Development & Consulting Services](https://hyperbrew.co/landings/boost-development)

## Prerequisites

- [Node.js 18](https://nodejs.org/en/) or later
- Package manager either
  - NPM (comes with Node.js)
  - [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) ( ensure by running `yarn set version classic` )
  - [PNPM](https://pnpm.io/installation) ( ensure by running `pnpm --version` )
- Figma Desktop App

## Quick Start

Create your new Bolt Figma project (follow CLI prompts)

- yarn - `yarn create bolt-figma`
- npm - `npx create-bolt-figma`
- pnpm - `pnpm create-bolt-figma`

Change directory to the new project

- `cd project`

Install Dependencies (if not already done by create command)

- yarn - `yarn`
- npm - `npm i`
- pnpm - `pnpm i`

Build the plugin (must run before `dev`, can also run after for panel to work statically without the process)

- yarn `yarn build`
- npm `npm run build`
- pnpm `pnpm build`

Run the plugin in hot reload mode for development

_Note: Ensure "Hot reload plugin" is checked in Figma Plugin Development menu_

- yarn `yarn dev`
- npm `npm run dev`
- pnpm `pnpm dev`

Bundles your plugin and specified assets from `copyZipAssets` to a zip archive in the `./zip` folder

- yarn `yarn zip`
- npm `npm run zip`
- pnpm `pnpm zip`

Write frontend UI code in `src/main.svelte`

Write backend figma code in `src-code/code.ts`

### Add Plugin to Figma

1. Open Figma
2. Select Figma Menu > Plugins > Development > Import Plugin from Manifest
3. Select the `manifest.json` file in the `dist` folder
4. Your plugin can now be launched from the menu or managed under "Manage Plugins"

### Load and Debug Plugin

1. Launch your plugin by going to `Figma Menu > Plugins > Development > "Your Plugin"`
2. Ensure Hot Reloading is checked under `Figma Menu > Plugins > Development > Hot Reloading Plugin`
3. Open the Dev Tools console with `Figma Menu > Plugins > Development > Show/Hide Console`

---

## Sending Messages between the Frontend and Backend

Bolt Figma makes messaging between the frontend UI and backend code layers simple and type-safe. This can be done with `listenTS()` and `dispatchTS()`.

Using this method accounts for:

- Setting up a scoped event listener in the listening context
- Removing the listener when the event is called (if `once` is set to true)
- Ensuring End-to-End Type-Safety for the event

### 1. Declare the Event Type in EventTS in shared/universals.ts

```js
export type EventTS = {
  myCustomEvent: {
    oneValue: string,
    anotherValue: number,
  },
  // [... other events]
};
```

### 2a. Send a Message from the Frontend to the Backend

**Backend Listener:** `src-code/code.ts`

```js
import { listenTS } from "./utils/code-utils";

listenTS("myCustomEvent", (data) => {
  console.log("oneValue is", data.oneValue);
  console.log("anotherValue is", data.anotherValue);
});
```

**Frontend Dispatcher:** `index.svelte` or `index.tsx` or `index.vue`

```js
import { dispatchTS } from "./utils/utils";

dispatchTS("myCustomEvent", { oneValue: "name", anotherValue: 20 });
```

### 2b. Send a Message from the Backend to the Frontend

**Frontend Listener:** `index.svelte` or `index.tsx` or `index.vue`

```js
import { listenTS } from "./utils/utils";

listenTS(
  "myCustomEvent",
  (data) => {
    console.log("oneValue is", data.oneValue);
    console.log("anotherValue is", data.anotherValue);
  },
  true,
);
```

_Note: `true` is passed as the 3rd argument which means the listener will only listen once and then be removed. Set this to true to avoid duplicate events if you only intend to recieve one reponse per function._

**Backend Dispatcher:** `src-code/code.ts`

```js
import { dispatchTS } from "./utils/code-utils";

dispatchTS("myCustomEvent", { oneValue: "name", anotherValue: 20 });
```

---

### Info on Build Process

Frontend code is built to the `.tmp` directory temporarily and then copied to the `dist` folder for final. This is done to avoid Figma throwing plugin errors with editing files directly in the `dist` folder.

The frontend code (JS, CSS, HTML) is bundled into a single `index.html` file and all assets are inlined.

The backend code is bundled into a single `code.js` file.

Finally the `manifest.json` is generated from the `figma.config.ts` file with type-safety. This is configured when running `yarn create bolt-figma`, but you can make additional modifications to the `figma.config.ts` file after initialization.

### Troubleshooting Assets

Figma requires the entire frontend code to be wrapped into a single HTML file. For this reason, bundling external images, svgs, and other assets is not possible.

The solution to this is to inline all assets. Vite is already setup to inline most asset types it understands such as JPG, PNG, SVG, and more, however if the file type you're trying to inline doesn't work, you may need to add it to the assetsInclude array in the vite config:

More Info: https://vitejs.dev/config/shared-options.html#assetsinclude

Additionally, you may be able to import the file as a raw string, and then use that data inline in your component using the `?raw` suffix.

For example:

```ts
import icon from "./assets/icon.svg?raw";
```

and then use that data inline in your component:

```js
// Svelte
{@html icon}

// React
<div dangerouslySetInnerHTML={{ __html: icon }}></div>

// Vue
<div v-html="icon"></div>
```
