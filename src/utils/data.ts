import { isFunction, isPrimitiveType, trueType } from "./types";

export const objectToString = (obj: object, level = 1) => {
  let str = `{\n`;
  for (const [key, value] of Object.entries(obj)) {
    if (isPrimitiveType(value)) {
      str += `${'\t'.repeat(level)}${key}: ${isNaN(value) ? `'${value}'` : value},\n`;
    } else {
      if (Array.isArray(value)) {
        str += `${'\t'.repeat(level)}${key}: ${arrayToString(value, level + 1)},\n`;
      } else if (isFunction(value)) {
        const func = value.toString();
        if (func.includes("function")) {
          const funcKey = func.slice(func.indexOf(" ") + 1, func.indexOf("("));
          str += `${'\t'.repeat(level)}${key}: ${func.replace(` ${funcKey}`, "")},\n`;
        } else {
          str += `${'\t'.repeat(level)}${key}: ${func},\n`;
        }
      } else {
        str += `${'\t'.repeat(level)}${key}: ${objectToString(value, level + 1)},\n`;
      }
    }
  }
  str = str.replaceAll(`this.`, "") + `${'\t'.repeat(level - 1)}}`;
  return str;
};

export const arrayToString = (array: Array<any>, level = 1) => {
  let str = `[`;
  array.forEach((item: any, index: number) => {
    if (isPrimitiveType(item)) {
      str += `${isNaN(item) ? `'${item}'` : item}${index < array.length - 1 ? ', ' : ''}`;
    } else {
      if (Array.isArray(item)) {
        str += `\n${'\t'.repeat(level)}${arrayToString(item, level + 1)},`;
      } else if (isFunction(item)) {
        str += `\n${'\t'.repeat(level)}${item.toString()},\n`;
      } else {
        str += `\n${'\t'.repeat(level)}${objectToString(item, level + 1)},`;
      }
    }
  });
  str = str.replaceAll(`this.`, "") + `]`;
  return str;
};

export const objectToArrayforTree = (obj: any, prop: any, key: any): any => {
  switch (trueType(obj[prop])) {
    case 'Number':
    case 'Symbol':
    case 'String':
    case 'Boolean':
      return {
        label: prop,
        key,
        value: obj[prop],
        type: trueType(obj[prop])
      }
    case 'Function':
      return {
        label: prop,
        key,
        value: obj[prop].toString(),
        type: 'Function'
      }
    case 'Array':
      return {
        label: prop,
        desc: `Array(${obj[prop].length})`,
        type: 'Array',
        key,
        children: obj[prop].map((item: any, index: number) => objectToArrayforTree(obj[prop], index, `${key}[${index}]`))
      }
    case 'Object':
      return {
        label: prop,
        desc: `{...}`,
        type: 'Object',
        key,
        children: Object.keys(obj[prop]).map((objKey) => objectToArrayforTree(obj[prop], objKey, `${key}.${objKey}`))
      }
  }
}