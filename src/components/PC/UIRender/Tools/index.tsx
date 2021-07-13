import { defineComponent, resolveComponent, toRaw } from 'vue'
import { t } from '@/lang'
import { DefaultProps } from '@/utils/props'
import { useComponents } from '@/hooks/uiRender'
import './style'

const ComponentToImage = function (this: any, key: string) {
  const Component: any = toRaw(resolveComponent(key))
  let componentRef: any
  const vm: any = (
    <Component {...DefaultProps(Component.props)} ref={(el: any) => el && (componentRef = el)} />
  )
  return (
    <li
      title={t(key)}
      onClick={() => {
        this.$emit('render', key, Component, componentRef)
      }}
    >
      <span class="component-key">{t(key)}</span>
      <div class="component-img">{vm}</div>
    </li>
  )
}

const ComponentTools = defineComponent({
  name: 'ComponentTools',
  componentName: 'ManageComponentTools',
  setup() {
    return useComponents()
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
        {this.componentKeys.map((key: string) => ComponentToImage.call(this, key))}
        <li id="last-component" style="height: 0;border: none" />
      </ul>
    )
  }
})

export default ComponentTools
