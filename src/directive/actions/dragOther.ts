import { dragDom as dragDomElement } from '@/utils/dom'
const dragDom = {
  name: 'drag-dom',
  mounted(el: any) {
    dragDomElement(el)
  }
}

export default dragDom
