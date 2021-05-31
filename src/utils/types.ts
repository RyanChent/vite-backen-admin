export const isNotEmptyString = (param: any): boolean => {
  return typeof param === 'string' && param.trim().length > 0
}

export const isObject = (param: any): boolean => {
  return param && typeof param === 'object'
}

export const isPrimitiveType = (param: any): boolean => {
  return ['string', 'symbol', 'number', 'boolean'].includes(typeof param)
}

export const trueType = (param: any): string => {
  return Object.prototype.toString.call(param).slice(8, -1)
}

export const isArray = (param: any): boolean => {
  return param instanceof Array || Array.isArray(param)
}

export const isMobile = (): boolean => {
  return (
    (typeof navigator !== 'undefined' &&
      Boolean(
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      )) ||
    (typeof window !== 'undefined' && window.innerWidth < 1024)
  )
}

export const isFunction = (param: any): boolean => {
  return param && typeof param === 'function'
}

export default {
  isNotEmptyString,
  isObject,
  isPrimitiveType,
  trueType,
  isArray,
  isFunction,
  isMobile
}
