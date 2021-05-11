import { nextTick } from "vue";
import { isNotEmptyString, isObject } from "@/utils/types.ts";
import { printDom } from "@/utils/dom.ts";
import { t } from "@/lang/index.ts";
const removePrint = () => {
  const printJS = document.getElementById("printJS");
  if (isObject(printJS)) {
    printJS?.parentNode?.removeChild(printJS);
  }
};
const print = {
  name: "print",
  mounted(el: HTMLElement, { value: header }: any) {
    const options = Object.assign(
      {},
      {
        printable: el,
        type: "html",
        style:
          "@page { margin: 0 10mm; } h1 { font-size: 24px; text-align: center; line-height: 35px; }",
      },
      isNotEmptyString(header) && { header: t(header) }
    );
    nextTick(() => {
      printDom(options, true);
    });
  },
  unmounted() {
    removePrint();
  },
};

export default print;
