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
          ;[Node, Object, Array, String, Number, Boolean].forEach((item: any) => {
            if (hasType(type, item)) {
              obj[i] = DefaultValue(type())
            } else if (hasType(types, item)) {
              obj[i] = DefaultValue(types())
            }
          })
        }
      }
    } else {
      if (hasType(props[i])) {
        obj[i] = noop
      } else {
        ;[Node, Object, Array, String, Number, Boolean].forEach((type: any) => {
          if (hasType(props[i], type)) {
            obj[i] = DefaultValue(type())
          }
        })
      }
    }
  }
  return obj
}
