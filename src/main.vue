<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  dispatchTS,
  getColorTheme,
  listenTS,
  subscribeColorTheme,
} from "./utils/utils";

// BOLT_SAMPLECODE_START
import boltIconLight from "./assets/bolt-figma-lightmode.svg";
import boltIconDark from "./assets/bolt-figma-darkmode.svg";
import viteIcon from "./assets/vite.svg";
import vueIcon from "./assets/vue.svg";
import typescriptIcon from "./assets/typescript.svg";
import sassIcon from "./assets/sass.svg";

let count = ref(0);

const helloWorld = () => {
  dispatchTS("hello", {
    string: "World",
    num: 20,
  });

  listenTS(
    "helloCallback",
    (res) => {
      console.log("helloCallback result: ", res);
    },
    true,
  );
};
// BOLT_SAMPLECODE_END

let lightOrDarkMode = ref(getColorTheme());
onMounted(() => {
  subscribeColorTheme((mode) => {
    lightOrDarkMode.value = mode;
  });
});
</script>

<template>
  <main>
    <!-- BOLT_SAMPLECODE_START -->
    <a href="https://hyperbrew.co/resources/bolt-figma/" target="_blank">
      <img v-if="lightOrDarkMode === 'light'" :src="boltIconLight" alt="" />
      <img v-else :src="boltIconDark" alt="" />
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
