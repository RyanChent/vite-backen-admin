import { isFunction, isPrimitiveType } from "./types";

export const objectToString = (obj: object) => {
  let str = `{\n`;
  for (const [key, value] of Object.entries(obj)) {
    if (isPrimitiveType(value)) {
      str += `\t${key}: ${typeof value === "string" ? `'${value}'` : value},\n`;
    } else {
      if (Array.isArray(value)) {
        str += `\t${key}: ${arrayToString(value)},\n`;
      } else if (isFunction(value)) {
        const func = value.toString()
        if (func.includes('function')) {
          str += `\t${func.replace('function ', '')},\n`
        } else {
          str += `\t${key}: ${func},\n`
        }
      } else {
        str += `\t${key}: ${objectToString(value)},\n`;
      }
    }
  }
  str += `}`;
  return str;
};

export const arrayToString = (array: Array<any>) => {
  let str = `[`;
  array.forEach((item: any) => {
    if (isPrimitiveType(item)) {
      str += `${typeof item === "string" ? `'${item}'` : item}, `;
    }
    if (Array.isArray(item)) {
      str += arrayToString(item);
    } else if (isFunction(item)) {
      str += item.toString();
    } else {
      str += objectToString(item);
    }
  });
  str += `]`;
  return str;
};
