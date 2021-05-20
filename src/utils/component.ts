import { objectToString } from "./data";
import { toMidLine } from "./tool";
import { isFunction, isNotEmptyString, isObject } from "./types";

const thirdUI = ["el", "van"];

const isThirdUI = (key: string): boolean =>
  thirdUI.some((uiKey) => key.toLowerCase().startsWith(uiKey));

export const getFile = (key: string, component: any): string => {
  if (!component.__file) {
    return `import ${key} from '@/components'`;
  } else {
    if (isThirdUI(key)) {
      return ``;
    }
    return `import ${key} from '${component.__file}'`;
  }
};

export const getSource = (key: string, prop: any, slots: any, emits: any) => {
  const newKey = isThirdUI(key) ? toMidLine(key) : key;
  let source = `<${newKey} `;
  const emitsKey = isObject(emits)
    ? Object.keys(emits).filter((emitkey) => emitkey.startsWith("update:"))
    : [];
  emitsKey.forEach((emitKey) => {
    const newEmitKey = emitKey.slice(emitKey.lastIndexOf(":") + 1);
    source += `\nv-model${
      newEmitKey === "modelValue" ? "" : ":" + newEmitKey
    }=""\n`;
    delete prop[newEmitKey];
  });

  const bindValue = objectToString(prop);
  if (Object.keys(prop).length > 0) {
    source += `v-bind="${bindValue}">`;
  }
  if (isObject(slots) && Object.keys(slots).length > 0) {
    Object.entries(slots).forEach(([slotKey, value]: any) => {
      if (isFunction(value)) {
        source += `\n<template v-slot:${slotKey}>\n${(
          value as Function
        )()}</template>\n`;
      } else if (
        ["key", "prop", "slots", "emits"].every((cKey) =>
          value.hasOwnProperty(cKey)
        )
      ) {
        source += `\n<template v-slot:${slotKey}>\n${getSource(
          value.key,
          value.prop,
          value.slots,
          value.emits
        )}\n</template>\n`;
      }
    });
  }
  if ([">", " "].includes(source[source.length - 1])) {
    source = source.slice(0, source.length - 1) + ` />`;
  } else {
    source += `</${newKey}>`;
  }
  return source;
};

export const getComponents = (importFile: Array<string>) =>
  importFile
    .filter(isNotEmptyString)
    .map(
      (str: any) =>
        `${str.split(" ")[1].replaceAll("{", "").replaceAll("}", "")}`
    )
    .join(`,\n\t  `);
