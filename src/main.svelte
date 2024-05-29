<script lang="ts">
  // BOLT_SAMPLECODE_START
  import boltIcon from "./assets/bolt-figma-light.svg?raw";
  import viteIcon from "./assets/vite.svg?raw";
  import svelteIcon from "./assets/svelte.svg?raw";
  import typescriptIcon from "./assets/typescript.svg?raw";
  import sassIcon from "./assets/sass.svg?raw";
  // BOLT_SAMPLECODE_END

  export const post = (msg: Message) => {
    parent.postMessage({ pluginMessage: msg }, "*");
  };

  // BOLT_SAMPLECODE_START
  const helloWorld = () => {
    post({
      func: "helloWorld",
      callback: "",
    });
  };

  let count: number = 0;
  const increment = () => (count += 1);
  // BOLT_SAMPLECODE_END
</script>

<main>
  <!-- BOLT_SAMPLECODE_START -->
  <a href="https://github.com/hyperbrew/bolt-figma/" target="_blank"
    >{@html boltIcon}
  </a>
  <div class="stack-icons">
    <a href="https://vitejs.dev" target="_blank"
      >{@html viteIcon}
      <span>Vite</span>
    </a>
    +
    <a href="https://svelte.dev" target="_blank">
      {@html svelteIcon}
      <span> Svelte </span>
    </a>
    +
    <a href="https://www.typescriptlang.org/" target="_blank">
      {@html typescriptIcon}
      <span> TypeScript </span>
    </a>
    +
    <a href="https://sass-lang.com/" target="_blank">
      {@html sassIcon}
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

<style>
</style>
