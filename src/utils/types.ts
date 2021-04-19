export const isNotEmptyString = (param: any): boolean => {
  return typeof param === "string" && param.trim().length === 0;
};

export const isObject = (param: any): boolean => {
  return param && typeof param === "object";
};

export const isPrimitiveType = (param: any): boolean => {
  return ["string", "symbol", "number", "boolean"].includes(typeof param);
};

export const trueType = (param: any): string => {
  return Object.prototype.toString.call(param).slice(8, -1);
};

export const isArray = (param: any): boolean => {
  return param instanceof Array || Array.isArray(param);
};

export const isMobile = () => {
  return (
    typeof navigator !== "undefined" &&
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  );
};

export default {
  isNotEmptyString,
  isObject,
  isPrimitiveType,
  trueType,
  isArray,
  isMobile,
};
