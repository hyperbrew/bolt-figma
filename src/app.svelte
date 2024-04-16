<script lang="ts">
  import boltIcon from "./assets/bolt-figma-light.svg?raw";
  import viteIcon from "./assets/vite.svg?raw";
  import svelteIcon from "./assets/svelte.svg?raw";
  import typescriptIcon from "./assets/typescript.svg?raw";
  import sassIcon from "./assets/sass.svg?raw";

  export const post = (msg: Message) => {
    parent.postMessage({ pluginMessage: msg }, "*");
  };

  const helloWorld = () => {
    post({
      func: "helloWorld",
      callback: "",
    });
  };

  let count: number = 0;
  const increment = () => {
    count += 1;
  };
</script>

<main>
  <a
    href="https://github.com/hyperbrew/bolt-figma/"
    target="_blank"
    rel="noreferrer"
    >{@html boltIcon}
  </a>
  <div class="stack-icons">
    <a href="https://vitejs.dev" target="_blank">{@html viteIcon} </a>
    <a href="https://svelte.dev" target="_blank"> {@html svelteIcon} </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      {@html typescriptIcon}
    </a>
    <a href="https://sass-lang.com/" target="_blank"> {@html sassIcon} </a>
  </div>
  <h1>Vite + Svelte + TypeScript</h1>

  <div class="card">
    <button on:click={increment}>
      Count is {count}
    </button>
    <button on:click={helloWorld}>Hello World</button>
  </div>
</main>

<style>
</style>
