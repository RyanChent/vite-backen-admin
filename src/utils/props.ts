import { trueType, isPrimitiveType } from './types'

const noop = function () {}

const DefaultValue = (type: any) => {
  return (
    {
      Array: [],
      Object: {},
      String: '',
      Number: 0,
      Boolean: false,
      Function: noop,
      Symbol: Symbol()
    } as any
  )[trueType(type)]
}

export const pick = (props: any, keys: string | string[]) => {
  if (typeof keys === 'string') {
    return { [keys]: props[keys] }
  }
  if (Array.isArray(keys)) {
    const obj: any = {}
    keys.forEach((key) => {
      obj[key] = props[key]
    })
    return obj
  }
  return {}
}

export const DefaultProps = (props: any = {}) => {
  const obj: any = {}
  for (let i in props) {
    let propType: any
    if (props[i]?.default) {
      if (isPrimitiveType(props[i].default)) {
        obj[i] = props[i].default
      } else {
      }
    } else if (props[i]?.type) {
      const type = props[i].type
      propType = Array.isArray(type) ? type[type.length - 1]() : type()
      obj[i] = DefaultValue(propType)
    } else if (props[i]?.types) {
      const types = props[i].types
      propType = Array.isArray(types) ? types[0]() : types()
      obj[i] = DefaultValue(propType)
    } else if (props[i]?.validator) {
    } else {
    }
  }
  return obj
}
