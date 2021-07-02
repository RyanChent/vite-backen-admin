import { createVNode, render } from 'vue'
import { uuid } from '@/utils/tool'
import ContextMenu from './index'

interface Menus {
  title: string
  click: Function
}

interface ContextMenuProps {
  visible: boolean
  menus: Menus[]
  left: string | number
  top: string | number
  [propName: string]: any
}

const ContextMenuFn = function (opts: ContextMenuProps) {
  if (typeof window === 'undefined') return
  const container = document.createElement('div')
  container.id = uuid(8)
  const vm: any = createVNode(
    ContextMenu,
    Object.assign(opts, {
      'onUpdate:visible': (visible: boolean) => {
        opts.visible = visible
      }
    })
  )
  vm.props.onVnodeBeforeUnmount = () => {
    render(null, container)
  }
  render(vm, container)
  document.body.appendChild(container.firstElementChild as Element)
  return {
    close: () => (vm.component.proxy.visible = false)
  }
}

export default ContextMenuFn
