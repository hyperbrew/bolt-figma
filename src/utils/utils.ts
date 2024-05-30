export const getColorTheme = () => {
  if (window && window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
    else if (window.matchMedia("(prefers-color-scheme: light)").matches)
      return "light";
  }
  return "light";
};

export const subscribeColorTheme = (
  callback: (mode: "light" | "dark") => void
) => {
  if (window && window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches }) => {
        if (matches) {
          console.log("change to dark mode!");
          callback("dark");
        } else {
          console.log("change to light mode!");
          callback("light");
        }
      });
  }
};
