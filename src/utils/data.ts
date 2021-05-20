import { isPrimitiveType } from "./types";

export const objectToString = (obj: object) => {
  let str = `{\n`;
  for (const [key, value] of Object.entries(obj)) {
    if (isPrimitiveType(value)) {
      str += `\t${key}: ${typeof value === "string" ? `'${value}'` : value},\n`;
    } else {
      if (Array.isArray(value)) {
        str += `\t${key}: ${arrayToString(value)},\n`;
      } else if (value instanceof Object) {
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
    } else if (item instanceof Object) {
      str += objectToString(item);
    }
  });
  str += `]`;
  return str;
};
