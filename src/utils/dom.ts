import { isFunction, isNotEmptyString } from "./types";

export const copyContent = async (content: string) => {
  if (!isNotEmptyString(content)) {
    return "";
  }
  const input = document.createElement("input");
  input.value = content;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
};

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

export const launchFullscreen = (element: any) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen();
  }
};

export const exitFullscreen = (element: any) => {
  if (element.exitFullscreen) {
    element.exitFullscreen();
  } else if (element.mozCancelFullScreen) {
    element.mozCancelFullScreen();
  } else if (element.webkitExitFullscreen) {
    element.webkitExitFullscreen();
  }
};

export const loadScript = (
  src: string,
  asyncScript = true,
  type = "text/javascript"
) => {
  const script = document.createElement("script");
  script.type = type;
  script.src = src;
  script.async = asyncScript;
  document.body.append(script);
  return script;
};

export class domResize {
  isBrowser = false;
  resizeObserver = null as any;
  constructor(dom: HTMLElement, callback: Function) {
    this.isBrowser = typeof document !== "undefined";
    if (this.isBrowser) {
      this.init(dom, callback);
    }
  }
  private init(dom: HTMLElement, callback: Function) {
    this.resizeObserver = new ResizeObserver((entries) => {
      isFunction(callback) && callback(entries);
    });
    this.resizeObserver.observe(dom);
  }
  observe(dom: HTMLElement) {}
  unObserve(callback: Function) {
    if (this.isBrowser) {
      this.resizeObserver.unobserve();
      isFunction(callback) && callback();
    }
  }

  disconnect(callback: Function) {
    if (this.isBrowser) {
      this.resizeObserver.disconnect();
      isFunction(callback) && callback();
    }
  }
}
