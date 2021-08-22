import { isFunction, isMobile, isNotEmptyString } from './types'
import printJS from 'print-js'
import html2canvas from 'html2canvas'

export const copyContent = async (content: string) => {
  if (isNotEmptyString(content)) {
    const textarea = document.createElement('textarea')
    textarea.value = content as string
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('Copy')
    document.body.removeChild(textarea)
  } else {
    return ''
  }
}

export const setDomFontSize = (): void => {
  const width = document.documentElement.clientWidth || document.body.clientWidth
  const fontSize = `${Math.max(1200, width) / 100}px`
  ;(document.getElementsByTagName('html')[0].style as any)['font-size'] = fontSize
}

export const setDomTitle = (title: string): void => {
  document.title = isMobile() ? title : `${title} - vite-backen-admin`
}

export const launchFullscreen = (element: any) => {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen()
  }
}

export const exitFullscreen = (element: any) => {
  if (element.exitFullscreen) {
    element.exitFullscreen()
  } else if (element.mozCancelFullScreen) {
    element.mozCancelFullScreen()
  } else if (element.webkitExitFullscreen) {
    element.webkitExitFullscreen()
  }
}

export const buttonBlur = (e: any) => {
  e.stopPropagation()
  const targetButton = e.path.find(
    (element: HTMLElement) => element.nodeName.toLowerCase() === 'button'
  )
  if (targetButton) {
    targetButton.blur()
  }
}

export const loadScript = (src: string, asyncScript = true, type = 'text/javascript') => {
  const script = document.createElement('script')
  script.type = type
  script.src = src
  script.async = asyncScript
  document.body.append(script)
  return script
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

export const printDom = async (options: any, htmltocanvas = false) => {
  if (htmltocanvas) {
    return html2canvas(options.printable, {
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      width: options.printable.clientWidth,
      height: options.printable.clientHeight,
      logging: false
    }).then((canvas) =>
      printJS({
        ...options,
        printable: canvas.toDataURL(),
        type: 'image'
      })
    )
  }
  return printJS(options)
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
