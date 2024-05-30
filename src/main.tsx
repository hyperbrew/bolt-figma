import React, { useState } from "react";

// BOLT_SAMPLECODE_START
import boltIcon from "./assets/bolt-figma-light.svg?raw";
import viteIcon from "./assets/vite.svg?raw";
import reactIcon from "./assets/react.svg?raw";
import typescriptIcon from "./assets/typescript.svg?raw";
import sassIcon from "./assets/sass.svg?raw";
// BOLT_SAMPLECODE_END

export const App = () => {
  const post = (msg: Message) => {
    parent.postMessage({ pluginMessage: msg }, "*");
  };

  // BOLT_SAMPLECODE_START
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);

  const helloWorld = () => {
    post({
      func: "helloWorld",
      callback: "",
    });
  };
  // BOLT_SAMPLECODE_END
  return (
    <>
      <main>
        {/* BOLT_SAMPLECODE_START */}
        <a href="https://github.com/hyperbrew/bolt-figma/" target="_blank">
          <div dangerouslySetInnerHTML={{ __html: boltIcon }}></div>
        </a>
        <div className="stack-icons">
          <a href="https://vitejs.dev" target="_blank">
            <div dangerouslySetInnerHTML={{ __html: viteIcon }}></div>
            <span>Vite</span>
          </a>
          +
          <a href="https://svelte.dev" target="_blank">
            <div dangerouslySetInnerHTML={{ __html: reactIcon }}></div>
            <span> React </span>
          </a>
          +
          <a href="https://www.typescriptlang.org/" target="_blank">
            <div dangerouslySetInnerHTML={{ __html: typescriptIcon }}></div>
            <span> TypeScript </span>
          </a>
          +
          <a href="https://sass-lang.com/" target="_blank">
            <div dangerouslySetInnerHTML={{ __html: sassIcon }}></div>
            <span> Sass </span>
          </a>
        </div>
        <div className="card">
          <button onClick={increment}>count is {count}</button>
          <button onClick={helloWorld}>Hello World</button>
        </div>
        <div>
          <p>
            Edit <span className="code">main.tsx</span> and save to test HMR
            updates.
          </p>
        </div>
        {/* BOLT_SAMPLECODE_END */}
      </main>
    </>
  );
};
