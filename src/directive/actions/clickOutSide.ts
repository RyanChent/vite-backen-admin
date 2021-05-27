import { isFunction, isNotEmptyString } from "@/utils/types";

const clickout = (e: MouseEvent, callback: unknown, selector: string) => {
  e.stopPropagation();
  const insideDom = (e as any).path.find(
    (item: HTMLElement) => item.querySelector && item.querySelector(selector)
  );
  if (insideDom && isFunction(callback)) {
    (callback as Function)();
  }
};

const clickOutSide = {
  name: "click-outside",
  clickTarget: {
    callback: null,
    selector: "",
  },
  mounted(el: HTMLElement, { value: { callback } }: any) {
    const { className, id } = el;
    const selector = isNotEmptyString(id) ? `#${id}` : `.${className}`;
    Object.assign(clickOutSide.clickTarget, {
      selector,
      callback,
    });
    document.addEventListener("click", (e: MouseEvent) =>
      clickout(e, callback, selector)
    );
  },
  beforeUnmount() {
    const { callback, selector } = clickOutSide.clickTarget;
    document.removeEventListener("click", (e: MouseEvent) =>
      clickout(e, callback, selector)
    );
  },
};

export default clickOutSide;
