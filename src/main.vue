<script setup lang="ts">
import { ref } from "vue";

// BOLT_SAMPLECODE_START
import boltIcon from "./assets/bolt-figma-light.svg";
import viteIcon from "./assets/vite.svg";
import vueIcon from "./assets/vue.svg";
import typescriptIcon from "./assets/typescript.svg";
import sassIcon from "./assets/sass.svg";
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
    <a href="https://hyperbrew.co/resources/bolt-figma/" target="_blank">
      <img :src="boltIcon" alt="" />
    </a>
    <div class="stack-icons">
      <a href="https://vitejs.dev" target="_blank"
        ><img :src="viteIcon" alt="" />
        <span>Vite</span>
      </a>
      +
      <a href="https://vuejs.org/" target="_blank">
        <img :src="vueIcon" alt="" />
        <span> Vue </span>
      </a>
      +
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img :src="typescriptIcon" alt="" />
        <span> TypeScript </span>
      </a>
      +
      <a href="https://sass-lang.com/" target="_blank">
        <img :src="sassIcon" alt="" />
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
