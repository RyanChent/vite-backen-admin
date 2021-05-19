import { trueType, isFunction } from "./types";

const noop = () => {};

const DefaultValue = (type: any) => {
  return {
    Array: [],
    Object: {},
    String: "",
    Number: 0,
    Boolean: false,
    Function: noop,
    Symbol: Symbol(),
  }[trueType(type)];
};

export const pick = (props: any, keys: string | Array<string>) => {
  if (typeof keys === "string") {
    return { [keys]: props[keys] };
  }
  if (Array.isArray(keys)) {
    const obj: any = {};
    keys.forEach((key) => {
      obj[key] = props[key];
    });
    return obj;
  }
  return {};
};

export const DefaultProps = (props: any = {}) => {
  const obj: any = {};
  for (let i in props) {
    if (props[i]?.default) {
      try {
        obj[i] = isFunction(props[i].default)
          ? props[i].default()
          : props[i].default;
      } catch (err) {
        obj[i] = props[i].default;
      }
    } else if (props[i]?.type) {
      let propsType: any;
      if (Array.isArray(props[i].type)) {
        propsType = props[i].type[0].prototype;
      } else {
        propsType = props[i].type.prototype;
      }
      obj[i] = DefaultValue(propsType);
    }
  }
  return obj;
};
