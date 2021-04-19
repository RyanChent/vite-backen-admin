import * as _ from "lodash";

export const setDomFontSize = (): void => {
  const width =
    document.documentElement.clientWidth || document.body.clientWidth;
  const fontSize = `${Math.max(1200, width) / 100}px`;
  (document.getElementsByTagName("html")[0].style as any)[
    "font-size"
  ] = fontSize;
};

const setDomFontSizeDebounce = _.debounce(setDomFontSize, 400);
window.addEventListener("resize", setDomFontSizeDebounce);
