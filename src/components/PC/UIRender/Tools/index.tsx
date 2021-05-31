import {
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  resolveComponent,
  toRaw
} from 'vue'
import { t } from '@/lang'
import { domScroll as DomScroll } from '@/utils/dom'
import { toCamel } from '@/utils/tool'
import { DefaultProps } from '@/utils/props'
import exclude from '@/data/component'
import './style'

const useComponents = () => {
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
  const listLoad = () => {
    current += 1
    const start = pageSize * current
    const end = Math.min(pageSize * (current + 1), keys.length)
    componentKeys.value = componentKeys.value.concat(keys.slice(start, end))
  }
  return {
    componentKeys,
    listLoad,
    components
  }
}

const ComponentTools = defineComponent({
  name: 'ComponentTools',
  componentName: 'ManageComponentTools',
  setup() {
    let domScroll: any
    const { components, listLoad, componentKeys } = useComponents()
    onMounted(() => {
      domScroll = new DomScroll(document.getElementById('last-component'), ([target]: any) => {
        if (target.isIntersecting) {
          listLoad()
        }
      })
    })
    onBeforeUnmount(() => {
      domScroll.disconnect()
      domScroll = null
    })
    return {
      components,
      listLoad,
      componentKeys
    }
  },
  render() {
    return (
      <ul
        class="infinite-component-list"
        onContextmenu={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        {this.componentKeys.map((key: string) => {
          const Component: any = toRaw(resolveComponent(key))
          let componentRef: any
          return (
            <li
              title={t(key)}
              onClick={() => {
                this.$emit('render', key, Component, componentRef)
              }}
            >
              <span class="component-key">{t(key)}</span>
              <div class="component-img">
                <Component
                  {...DefaultProps(Component.props)}
                  ref={(el: any) => el && (componentRef = el)}
                />
              </div>
            </li>
          )
        })}
        <li id="last-component" style="height: 0;border: none" />
      </ul>
    )
  }
})

export default ComponentTools
