export const setDomFontSize = (): void => {
  const width =
    document.documentElement.clientWidth || document.body.clientWidth;
  const fontSize = `${Math.max(1200, width) / 100}px`;
  (document.getElementsByTagName("html")[0].style as any)[
    "font-size"
  ] = fontSize;
};

export const setDomTitle = (title: string): void => {
  document.title = `vite-backen-admin | ${title}`;
};
