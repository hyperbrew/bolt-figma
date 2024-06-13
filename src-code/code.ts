import { getStore, setStore, listenTS, dispatchTS } from "./utils/code-utils";

figma.showUI(__html__, {
  themeColors: true,
  width: 550,
  height: 600,
});

listenTS("hello", (res) => {
  console.log("code.ts");
  alert(`Hello ${res.string}`);
  dispatchTS("helloCallback", { result: true });
});
