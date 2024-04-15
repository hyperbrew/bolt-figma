figma.showUI(__html__, { width: 550, height: 600 });

figma.currentPage.children;

const getStore = async (key: string) => {
  console.log("get store ", key);
  const value = await figma.clientStorage.getAsync(key);
  console.log("get store ", key, value);
  return value;
};

const setStore = async (key: string, value: string) => {
  console.log("set store ", key, value);
  await figma.clientStorage.setAsync(key, value);
};

figma.ui.onmessage = async (msg: Message) => {
  let data: any;

  if (msg.func === "myCustomMessage") {
    // Do Stuff
    console.log("do");
  }

  if (msg.callback) {
    figma.ui.postMessage({
      func: msg.callback,
      data: data,
    });
  }

  if (msg.func === "close") {
    figma.closePlugin();
  }
};
