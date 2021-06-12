import { trueType, isFunction } from '@/utils/types'

const permission = {
  name: 'permission',
  async mounted(el: HTMLElement, { value }: any, vnode: any) {
    let visible = true
    switch (trueType(value)) {
      case 'Boolean':
        visible = value
        break
      case 'Function':
        visible = Boolean(value())
        break
      case 'Promise':
        visible = Boolean(await value)
      case 'Object':
        if (isFunction(value.callback)) {
          const res = value.callback()
          if (isFunction(res.then)) {
            visible = Boolean(await res)
          } else {
            visible = res
          }
        }
        break
    }
    if (!visible) {
      el.parentNode?.removeChild ? el.parentNode.removeChild(el) : (el.style.display = 'none')
    }
  },
  updated(el: any, { value }: any, vnode: any, oldvnode: any) {},
  beforeUnmount(el: any, { value }: any, vnode: any) {}
}

export default permission
