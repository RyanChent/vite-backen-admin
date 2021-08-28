import { isFunction } from '../types'
export const buttonBlur = (e: any) => {
  e.stopPropagation()
  const targetButton = e.path.find(
    (element: HTMLElement) => element.nodeName.toLowerCase() === 'button'
  )
  if (targetButton) {
    targetButton.blur()
  }
}

export const dragDom = (
  el: any,
  minLeft = 220,
  minTop = 60,
  maxLeft = (document.documentElement.clientWidth || document.body.clientWidth) - 100,
  maxTop = (document.documentElement.clientHeight || document.body.clientHeight) - 80
) => {
  const dragDomElement = el as HTMLElement
  dragDomElement.style.cssText += ';cursor:move;'

  let move = false

  dragDomElement.onmousedown = (e: any): void => {
    const offsetX = e.offsetX
    const offsetY = e.offsetY
    move = true

    document.onmousemove = (e: any): void => {
      if (!move) return
      const clientX = e.clientX
      const clientY = e.clientY

      let left = clientX - offsetX
      let top = clientY - offsetY

      left = Math.max(minLeft, Math.min(left, maxLeft))
      top = Math.max(minTop, Math.min(top, maxTop))
      dragDomElement.style.left = `${left}px`
      dragDomElement.style.top = `${top}px`
    }
  }
  document.onmouseup = dragDomElement.onmouseup = (): void => {
    move = false
    document.onmousemove = null
    document.onmouseup = null
  }
}

export class domResize {
  private isBrowser = false
  private resizeObserver: any = null
  constructor(dom: HTMLElement, callback: Function) {
    this.isBrowser = typeof document !== 'undefined'
    if (this.isBrowser) {
      this.init(dom, callback)
    }
  }
  private init(dom: HTMLElement, callback: Function) {
    this.resizeObserver = new ResizeObserver((entries) => {
      isFunction(callback) && callback(entries)
    })
    this.resizeObserver.observe(dom)
  }
  observe(dom: HTMLElement) {}
  unObserve(callback: Function) {
    if (this.isBrowser) {
      this.resizeObserver.unobserve()
      isFunction(callback) && callback()
    }
  }

  disconnect(callback: Function) {
    if (this.isBrowser) {
      this.resizeObserver.disconnect()
      isFunction(callback) && callback()
    }
  }
}

export class ClickOutSide {
  private isBrowser = false
  callback: any
  selector = ''
  constructor() {
    this.isBrowser = typeof document !== 'undefined'
  }
  private clickout(e: any) {
    e.stopPropagation()
    const domSelector = {
      '.': 'className',
      '#': 'id'
    }[this.selector[0]]
    if (domSelector) {
      this.selector = this.selector.slice(1)
      const insideDom = e.path.find((item: any) => item[domSelector]?.includes?.(this.selector))
      if (!insideDom && isFunction(this.callback)) {
        this.callback()
      }
    }
  }
  on(selector: string, callback: unknown) {
    if (this.isBrowser) {
      this.selector = selector
      this.callback = callback
      document.addEventListener('click', (e) => this.clickout(e))
    }
  }
  off() {
    if (this.isBrowser) {
      document.removeEventListener('click', (e) => this.clickout(e))
    }
  }
}

export class domScroll {
  isBrowser = false
  scrollObserver: any = null
  constructor(dom: HTMLElement, callback: Function) {
    this.isBrowser = typeof window !== 'undefined'
    if (this.isBrowser) {
      this.init(dom, callback)
    }
  }
  private init(dom: HTMLElement, callback: Function) {
    this.scrollObserver = new IntersectionObserver((entries) => {
      isFunction(callback) && callback(entries)
    })
    this.scrollObserver.observe(dom)
  }
  observe(dom: HTMLElement) {}
  unObserve(callback: Function) {
    if (this.isBrowser) {
      this.scrollObserver.unobserve()
      isFunction(callback) && callback()
    }
  }

  disconnect(callback: Function) {
    if (this.isBrowser) {
      this.scrollObserver.disconnect()
      isFunction(callback) && callback()
    }
  }
}
