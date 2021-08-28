import { nextTick } from 'vue'
import { isNotEmptyString, isObject } from '@/utils/types'
import { printDom } from '@/utils/dom'
import { t } from '@/lang'
const removePrint = () => {
  const printJS = document.getElementById('printJS')
  if (isObject(printJS)) {
    printJS?.parentNode?.removeChild(printJS)
  }
}
const print = {
  name: 'print',
  mounted(el: HTMLElement, { value: header }: any) {
    const options = Object.assign(
      { printable: el },
      isNotEmptyString(header) && { header: t(header) }
    )
    nextTick(() => {
      printDom(options, true)
    })
  },
  unmounted() {
    removePrint()
  }
}

export default print
