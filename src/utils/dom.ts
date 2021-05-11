import { isFunction, isMobile, isNotEmptyString } from "./types";
import printJS from "print-js";
import html2canvas from "html2canvas";

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
  (document.getElementsByTagName("html")[0].style as any)["font-size"] =
    fontSize;
};

export const setDomTitle = (title: string): void => {
  document.title = isMobile() ? title : `${title} - vite-backen-admin`;
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

export class ClickOutSide {
  private isBrowser = false;
  callback: any;
  selector = "";
  constructor() {
    this.isBrowser = typeof document !== "undefined";
  }
  private clickout(e: MouseEvent) {
    e.stopPropagation();
    const insideDom = (e as any).path.find(
      (item: HTMLElement) =>
        item.querySelector && item.querySelector(this.selector)
    );
    if (insideDom && isFunction(this.callback)) {
      (this.callback as Function)();
    }
  }
  on(selector: string, callback: unknown) {
    if (this.isBrowser) {
      this.selector = selector;
      this.callback = callback;
      document.addEventListener("click", (e) => this.clickout(e));
    }
  }
  off() {
    if (this.isBrowser) {
      document.removeEventListener("click", (e) => this.clickout(e));
    }
  }
}

export const printDom = async (options: any, htmltocanvas = false) => {
  if (htmltocanvas) {
    return html2canvas(options.printable, {
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      width: options.printable.clientWidth,
      height: options.printable.clientHeight,
      logging: false,
    }).then((canvas) =>
      printJS({
        ...options,
        printable: canvas.toDataURL(),
        type: "image",
      })
    );
  }
  return printJS(options)
};
