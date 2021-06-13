import { trueType } from '@/utils/types'

const permission = {
  name: 'permission',
  async mounted(el: HTMLElement, { value }: any, vnode: any) {
    let visible = true
    try {
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
          if (trueType(value.callback) === 'Function') {
            visible = Boolean(value.callback())
          }
          if (trueType(value.callback) === 'Promise') {
            visible = Boolean(await value.callback)
          }
          break
      }
    } catch (err) {
      if (!visible) {
        el.parentNode?.removeChild ? el.parentNode.removeChild(el) : (el.style.display = 'none')
      }
    }
  },
  updated(el: any, { value }: any, vnode: any, oldvnode: any) {},
  beforeUnmount(el: any, { value }: any, vnode: any) {}
}

export default permission
