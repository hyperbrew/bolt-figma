<script setup lang="ts">
import { ref } from "vue";

// BOLT_SAMPLECODE_START
import boltIcon from "./assets/bolt-figma-light.svg?raw";
import viteIcon from "./assets/vite.svg?raw";
import vueIcon from "./assets/vue.svg?raw";
import typescriptIcon from "./assets/typescript.svg?raw";
import sassIcon from "./assets/sass.svg?raw";
// BOLT_SAMPLECODE_END

const post = (msg: Message) => {
  parent.postMessage({ pluginMessage: msg }, "*");
};

// BOLT_SAMPLECODE_START
let count = ref(0);

const helloWorld = () => {
  post({
    func: "helloWorld",
    callback: "",
  });
};
// BOLT_SAMPLECODE_END
</script>

<template>
  <main>
    <!-- BOLT_SAMPLECODE_START -->
    <a href="https://github.com/hyperbrew/bolt-figma/" target="_blank">
      <div v-html="boltIcon"></div>
    </a>
    <div class="stack-icons">
      <a href="https://vitejs.dev" target="_blank"
        ><div v-html="viteIcon"></div>
        <span>Vite</span>
      </a>
      +
      <a href="https://svelte.dev" target="_blank">
        <div v-html="vueIcon"></div>
        <span> Vue </span>
      </a>
      +
      <a href="https://www.typescriptlang.org/" target="_blank">
        <div v-html="typescriptIcon"></div>
        <span> TypeScript </span>
      </a>
      +
      <a href="https://sass-lang.com/" target="_blank">
        <div v-html="sassIcon"></div>
        <span> Sass </span>
      </a>
    </div>
    <div class="card">
      <button @click="count++">count is {{ count }}</button>
      <button @click="helloWorld">Hello World</button>
    </div>
    <div>
      <p>
        Edit <span class="code">main.vue</span> and save to test HMR updates.
      </p>
    </div>
    <!-- BOLT_SAMPLECODE_END -->
  </main>
</template>

<style lang="scss">
@import "./variables.scss";
</style>
