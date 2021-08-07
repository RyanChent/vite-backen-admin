import { getCurrentInstance, markRaw, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { getFile } from '@/utils/component'
import { deepClone } from '@/utils/data'
import { uuid, toCamel } from '@/utils/tool'
import { domScroll } from '@/utils/dom'
import { isNotEmptyString } from '@/utils/types'
import { getSource, getComponents } from '@/utils/component'
import GenerateFile from '@/utils/file'
import { t } from '@/lang'
import exclude from '@/data/component'

export const useHandleComponent = () => {
  const vueRenderStr = ref<any>([])
  const vueScriptStr = ref<any>({})
  const handleComponentClick = (key: string, component: any, cref: any) => {
    vueScriptStr.value[key] = getFile(key, component)
    vueRenderStr.value.push({
      component: markRaw(component),
      prop: reactive(deepClone(cref.$props)),
      key,
      slots: reactive(deepClone(cref.$slots)),
      emits: reactive(deepClone(component.emits)),
      tab: Object.keys(cref.$props).length ? 'prop' : 'style',
      id: uuid()
    })
  }

  return {
    vueRenderStr,
    vueScriptStr,
    handleComponentClick
  }
}

export const useRenderTree = (props: any) => {
  const visible = ref<boolean>(false)
  const current = ref<any>({})
  const top = ref<number>(0)
  const left = ref<number>(0)
  const treeNodeRightClick = (e: MouseEvent, data: any, node: any, treeRef: any) => {
    const { clientX, clientY } = e
    top.value = clientY
    left.value = clientX
    current.value = data
    visible.value = true
  }
  const rightMenus = [
    {
      title: 'remove component',
      click: () => {
        const cid = props.renderStr.findIndex((item: any) => item.id === current.value.id)
        if (cid > -1) {
          props.renderStr.splice(cid, 1)
        }
      }
    }
  ]
  return {
    visible,
    treeNodeRightClick,
    current,
    top,
    left,
    rightMenus
  }
}

export const useComponents = () => {
  let scrollDom: any
  const {
    appContext: { components }
  }: any = getCurrentInstance()
  const keys = [
    ...new Set(
      Object.keys(components)
        .map(toCamel)
        .filter((key) => !exclude.includes(key))
    )
  ]
  const pageSize = 20
  let current = 0
  const componentKeys = ref<any>(keys.slice(0, pageSize))

  onMounted(() => {
    scrollDom = new domScroll(document.getElementById('last-component'), ([target]: any) => {
      if (target.isIntersecting) {
        current += 1
        const start = pageSize * current
        const end = Math.min(pageSize * (current + 1), keys.length)
        componentKeys.value = componentKeys.value.concat(keys.slice(start, end))
      }
    })
  })

  onBeforeUnmount(() => {
    scrollDom.disconnect()
    scrollDom = null
  })

  return {
    components,
    componentKeys
  }
}

export const useRenderHeadProps = (props: any) => ({
  vueName: ref<any>(''),
  vueType: ref<any>(true),
  htmlName: ref<any>(''),
  ...useHandleDownload(props)
})

const useHandleDownload = (props: any) => {
  let generate: any
  const {
    proxy: { $message }
  }: any = getCurrentInstance()

  const addBracketsSpace = (str: string, symbol: string): string => {
    switch (symbol) {
      case '(':
        return str.replaceAll('(', '( ').replaceAll(')', ' )')
      case '{':
        return str.replaceAll('{', '{ ').replaceAll('}', ' }')
      case '[':
        return str.replaceAll('[', '[ ').replaceAll(']', ' ]')
      default:
        return str
    }
  }
  const generateVue = (name: string, type: boolean) => {
    if (isNotEmptyString(name)) {
      generate.generateFile({
        name,
        composition: type,
        renderStr: props.renderStr
          .map((Cstr: any) => getSource(Cstr.key, Cstr.prop, Cstr.slots, Cstr.emits))
          .join('\n'),
        importStr: props.importStr
          .filter(isNotEmptyString)
          .map((str: any) => (str.includes('{') ? addBracketsSpace(str, '{') : str))
          .join('\n'),
        componentStr: getComponents(props.importStr)
      })
      name = ''
    } else {
      $message.error(t('please.input.something'))
    }
  }
  const generateHTML = (name: string) => {
    if (isNotEmptyString(name)) {
      generate.generateFile({
        name,
        domstr: document.querySelector('.ui-render-content .render-panel')?.innerHTML,
        composition: false,
        source: false
      })
      name = ''
    } else {
      $message.error(t('please.input.something'))
    }
  }

  onMounted(() => {
    generate = new GenerateFile()
  })

  onBeforeUnmount(() => {
    generate = null
  })

  return {
    generateVue,
    generateHTML
  }
}

export const useHandleContent = (props: any) => {
  const top = ref<number>(0)
  const left = ref<number>(0)
  const visible = ref<boolean>(false)
  const current = ref<any>({ id: '' })

  const rightMenus = [
    {
      title: 'remove component',
      click: () => {
        if (Array.isArray(props.renderStr)) {
          const index = props.renderStr.findIndex((item: any) => item.id === current.value.id)
          index > -1 && props.renderStr.splice(index, 1)
        }
      }
    }
  ]

  const closeOthers = () => {
    const close = (list: any) => {
      if (Array.isArray(list)) {
        list.forEach((item) => {
          item.showConfig = false
        })
      }
    }
    close(props.renderStr)
  }

  const closePopover = (e: MouseEvent) => {
    e.stopPropagation()
    current.value.showConfig = false
  }

  const clickComponent = (e: MouseEvent, item: any) => {
    e.stopPropagation()
    closeOthers()
    item.showConfig = true
    current.value = item
  }

  const contextMenuComponent = (e: MouseEvent, item: any) => {
    top.value = e.clientY
    left.value = e.clientX
    visible.value = true
    current.value = item
  }

  onMounted(() => {
    document.addEventListener('click', closePopover)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', closePopover)
  })

  return {
    rightMenus,
    top,
    left,
    visible,
    current,
    closeOthers,
    clickComponent,
    contextMenuComponent
  }
}
