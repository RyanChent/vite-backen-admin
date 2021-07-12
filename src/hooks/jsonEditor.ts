import { ref } from 'vue'
import { objectToArrayforTree, objectToString, arrayToString } from '@/utils/data'
import { isNotEmptyString } from '@/utils/types'
import { debounce } from '@/utils/tool'

const valueType = ['String', 'Number', 'Boolean', 'Function', 'Array', 'Object']

// show jsonstring
const showJson = (jsonString: any, props: any, type: string) =>
  props.showJson &&
  debounce(
    () =>
      (jsonString.value =
        type === 'Array' ? arrayToString(props.json) : objectToString(props.json)),
    600
  )()

// mapping origin key
const getOriginKey = (key: string, type: string): any => {
  let newKey = key.replace('root', '')
  if (type === 'Array') {
    newKey = newKey.slice(1)
    return newKey.startsWith('[') ? newKey : `[${newKey}`
  }
  if (type === 'Object') {
    return newKey
  }
}

export const useRenderEditor = (props: any, type: string) => {
  const jsonKey = ref<any>()
  const jsonString = ref<string>()
  const treeData = ref<any>()
  /** Array */
  if (type === 'Array') {
    jsonKey.value = props.json.map((item: undefined, index: any) => `root.${index}]`)
    jsonString.value = arrayToString(props.json)
    treeData.value = [
      {
        label: '[',
        key: 'root',
        type: 'Array',
        children: props.json.map((item: undefined, index: any) =>
          objectToArrayforTree(props.json, index, `root.${index}]`, jsonKey.value)
        )
      },
      {
        label: ']',
        key: ']'
      }
    ]
  }
  /** Object */
  if (type === 'Object') {
    jsonKey.value = Object.keys(props.json).map((key) => `root.${key}`)
    jsonString.value = objectToString(props.json)
    treeData.value = [
      {
        label: '{',
        key: 'root',
        type: 'Object',
        children: Object.keys(props.json).map((prop) =>
          objectToArrayforTree(props.json, prop, `root.${prop}`, jsonKey.value)
        )
      },
      {
        label: '}',
        key: '}'
      }
    ]
  }
  // 值变动时响应方法
  const componentOnChange = (prop: any, propKey: any) => {
    const originKey = getOriginKey(prop.key, type)
    new Function('obj', 'value', `obj${originKey} = value`)(props.json, prop[propKey])
    showJson(jsonString, props, type)
  }
  // while property type change
  const propertyTypeChange = (data: any) => {
    const originKey = getOriginKey(data.key, type)
    switch (data.type) {
      case 'Array':
      case 'Object':
        if (Array.isArray(data.children)) {
          jsonKey.value = jsonKey.value.filter(
            (key: string) => !data.children.map((item: any) => item.key).includes(key)
          )
        }
        delete data.value
        data.children = []
        data.desc = data.type === 'Array' ? 'Array(0)' : 'Object(0)'
        new Function('obj', 'value', `obj${originKey} = value`)(
          props.json,
          data.type === 'Array' ? [] : {}
        )
        break
      default:
        data.value = ''
        delete data.desc
        delete data.children
        new Function('obj', `obj${originKey} = ''`)(props.json)
        break
    }

    showJson(jsonString, props, type)
  }
  // add a new object property
  const addProperty = (parent: any, node: any) => {
    const obj: any = {
      value: '',
      type: 'String'
    }
    if (Array.isArray(parent.children)) {
      if (parent.type === 'Array') {
        obj.label = parent.children.length
        obj.key = parent.key + `[${obj.label}]`
        parent.desc && (parent.desc = `Array(${obj.label + 1})`)
      }
      if (parent.type === 'Object') {
        obj.label = 'a'
        obj.key = parent.key + `.a`
        parent.desc && (parent.desc = `Object(${parent.children.length + 1})`)
      }
    }
    if (!jsonKey.value.includes(obj.key)) {
      jsonKey.value.push(obj.key)
      const originKey = getOriginKey(obj.key, type)
      new Function('obj', 'value', `obj${originKey} = value`)(props.json, obj.value)
      parent.children.push(obj)
    }

    if (node.expanded === false) {
      node.expanded = true
    }
  }
  // remove an object property
  const removeProperty = (parent: any, key: any) => {
    const keyIndex = (parent.children || parent).findIndex((item: any) => item.key === key)
    if (keyIndex > -1) {
      ;(parent.children || parent).splice(keyIndex, 1)
      jsonKey.value = jsonKey.value.filter((jsonkey: string) => !jsonkey.includes(key))
      const originKey = getOriginKey(key, type)
      new Function('obj', `delete obj${originKey}`)(props.json)
    }

    if (parent.type === 'Array') {
      parent.desc && (parent.desc = `Array(${parent.children.length})`)
    }
    if (parent.type === 'Object') {
      parent.desc && (parent.desc = `Object(${parent.children.length})`)
    }
    if (type === 'Array') {
      console.log(props.json)
    }
    showJson(jsonString, props, type)
  }
  // modify property key
  const propertyKeyChange = (newKey: any, node: any, data: any) => {
    if (isNotEmptyString(newKey)) {
      const { data: parentData } = node.parent
      let originKey = getOriginKey(data.key, type)
      jsonKey.value = jsonKey.value.filter((key: string) => !key.includes(data.key))
      const originChildren = new Function('obj', `return obj${originKey}`)(props.json)
      new Function('obj', `delete obj${originKey}`)(props.json)
      let newDataKey = originKey.slice(0, originKey.lastIndexOf(data.label))
      console.log(newDataKey)
      if (parentData.type === 'Array') {
        newDataKey += `${newKey}]`
      }
      if (parentData.type === 'Object') {
        newDataKey += newKey
      }
      data.key = newDataKey
      data.label = newKey
      new Function('obj', 'value', `obj${newDataKey} = value`)(props.json, originChildren)
      showJson(jsonString, props, type)
    }
  }
  // drag property to change the json structure
  const dragPropertyDrop = (drag: any, drop: any, position: string, e: DragEvent) => {
    switch (position) {
      case 'before':
        break
      case 'after':
        break
      case 'inner':
        break
    }
  }
  return {
    valueType,
    jsonKey,
    jsonString,
    treeData,
    componentOnChange,
    propertyKeyChange,
    removeProperty,
    dragPropertyDrop,
    addProperty,
    propertyTypeChange
  }
}
