var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { myFunction } from "./lib";
figma.showUI(__html__, { width: 550, height: 600 });
figma.currentPage.children;
const getStore = (key) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get store ", key);
    const value = yield figma.clientStorage.getAsync(key);
    console.log("get store ", key, value);
    return value;
});
const setStore = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("set store ", key, value);
    yield figma.clientStorage.setAsync(key, value);
});
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
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
    if (msg.func === "helloWorld") {
        myFunction();
    }
});
//# sourceMappingURL=code.js.map