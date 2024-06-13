<script lang="ts">
  import { onMount } from "svelte";
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
  import svelteIcon from "./assets/svelte.svg";
  import typescriptIcon from "./assets/typescript.svg";
  import sassIcon from "./assets/sass.svg";

  let count: number = 0;
  const increment = () => (count += 1);

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
      true
    );
  };
  // BOLT_SAMPLECODE_END

  let lightOrDarkMode = getColorTheme();
  onMount(() => {
    subscribeColorTheme((mode) => {
      lightOrDarkMode = mode;
    });
  });
</script>

<main>
  <!-- BOLT_SAMPLECODE_START -->
  <a
    class="bolt-icon"
    href="https://hyperbrew.co/resources/bolt-figma/"
    target="_blank"
  >
    {#if lightOrDarkMode === "dark"}
      <img src={boltIconDark} alt="" />
    {:else if lightOrDarkMode === "light"}
      <img src={boltIconLight} alt="" />
    {/if}
  </a>
  <div class="stack-icons">
    <a href="https://vitejs.dev" target="_blank">
      <img src={viteIcon} alt="" />
      <span>Vite</span>
    </a>
    +
    <a href="https://svelte.dev" target="_blank">
      <img src={svelteIcon} alt="" />
      <span> Svelte </span>
    </a>
    +
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src={typescriptIcon} alt="" />
      <span> TypeScript </span>
    </a>
    +
    <a href="https://sass-lang.com/" target="_blank">
      <img src={sassIcon} alt="" />
      <span> Sass </span>
    </a>
  </div>

  <div class="card">
    <button on:click={increment}>
      Count is {count}
    </button>
    <button on:click={helloWorld}>Hello World</button>
  </div>
  <p>
    Edit
    <code>main.svelte</code> and save to use Hot Reloading.
  </p>
  <!-- BOLT_SAMPLECODE_END -->
</main>

<style lang="scss">
  @import "./variables.scss";
</style>
