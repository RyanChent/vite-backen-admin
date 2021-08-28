import { isNotEmptyString } from '../types'
import { t } from '@/lang'
import printJS from 'print-js'
import html2canvas from 'html2canvas'

export const copyContent = async (content: string) => {
  if (isNotEmptyString(content)) {
    const textarea = document.createElement('textarea')
    textarea.value = content
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('Copy')
    document.body.removeChild(textarea)
  } else {
    return ''
  }
}

export const printDom = async (config: any, htmltocanvas = false) => {
  if (htmltocanvas) {
    const { printable, header } = config
    return snapShot(printable, header).then((res) => printJS({ ...res, type: 'image' }))
  }
  return printJS(config)
}

export const snapShot = async (el: HTMLElement, header: string) => {
  const options = Object.assign(
    {},
    {
      printable: el,
      type: 'html',
      style:
        '@page { margin: 0 10mm; } h1 { font-size: 20px; text-align: center; line-height: 35px; }'
    },
    isNotEmptyString(header) && { header: t(header) }
  )
  return html2canvas(options.printable, {
    useCORS: true,
    scrollX: 0,
    scrollY: 0,
    width: options.printable.clientWidth,
    height: options.printable.clientHeight,
    logging: false
  }).then((canvas) => ({
    printable: canvas.toDataURL(),
    options
  }))
}
