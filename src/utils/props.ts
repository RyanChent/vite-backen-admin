import { trueType, isPrimitiveType, isDef } from './types'

const noop = function () {}

const hasType = (param: any, type = Function) =>
  (Array.isArray(param) ? param : [param]).some((item: any) => item === type)

const DefaultValue = (type: any) =>
  ((
    {
      Array: [],
      Object: {},
      String: '',
      Number: 0,
      Boolean: false,
      Function: noop,
      Symbol: Symbol()
    } as any
  )[trueType(type)])

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
  const instanceType: any = [Node, Object, Array, String, Number, Boolean]
  for (let i in props) {
    if (trueType(props[i]) === 'Object') {
      const { default: _default, type, types } = props[i]
      if (isDef(_default)) {
        if (hasType(type) || hasType(types) || isPrimitiveType(_default)) {
          obj[i] = _default
        } else {
          obj[i] = _default()
        }
      } else {
        if (hasType(type) || hasType(types)) {
          obj[i] = noop
        } else {
          for (let j = instanceType.length; j >= 0; j--) {
            if (hasType(type, instanceType[j])) {
              obj[i] = DefaultValue(type())
              break
            }
            if (hasType(types, instanceType[j])) {
              obj[i] = DefaultValue(types())
              break
            }
          }
        }
      }
    } else {
      if (hasType(props[i])) {
        obj[i] = noop
      } else {
        for (let j = instanceType.length; j >= 0; j--) {
          if (hasType(props[i], instanceType[j])) {
            obj[i] = DefaultValue(instanceType[j]())
            break
          }
        }
      }
    }
  }
  return obj
}
