export function parseTime(time: any, cFormat = '{y}-{m}-{d} {h}:{i}:{s}'): string {
  if (arguments.length === 0) {
    return ''
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export const downFile = (blob: Blob, filename: string, suffix = ''): void => {
  const a = document.createElement('a')
  const downname = filename.includes(suffix) ? filename : filename + suffix
  if ('download' in a) {
    a.href = URL.createObjectURL(blob)
    a.download = downname
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
  } else {
    if (window && window.navigator) {
      window.navigator.msSaveBlob(blob, downname)
    }
  }
}

export const toCamel = (str: string) =>
  str
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('')

export const toMidLine = (str: string) =>
  str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .slice(1)

export const uuid = (length = 31) =>
  'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
    .replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    .slice(0, length + 1)

export const changeColor = (col: string, amt: any) => {
  let usePound = false
  if (col[0] == '#') {
    col = col.slice(1)
    usePound = true
  }
  const num = parseInt(col, 16)
  const r = Math.max(0, Math.min((num >> 16) + amt, 255))
  const b = Math.max(0, Math.min(((num >> 8) & 0x00ff) + amt, 255))
  const g = Math.max(0, Math.min((num & 0x0000ff) + amt, 255))
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export const changeHexToRgba = (col: string, alpha = 0.2) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  col = col.toLowerCase()
  //十六进制颜色转换为RGB格式
  if (col && reg.test(col)) {
    return 'rgba(' + getRgbNum(col).join(',') + ',' + alpha + ')'
  } else {
    return col
  }
}

const getRgbNum = (color: string) => {
  if (color.length === 4) {
    let sColorNew = '#'
    for (let i = 1; i < 4; i += 1) {
      sColorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
    }
    color = sColorNew
  }

  const sColorChange = []
  for (let i = 1; i < 7; i += 2) {
    sColorChange.push(parseInt('0x' + color.slice(i, i + 2)))
  }
  return sColorChange
}

export const debounce = (func: Function, wait: number, immediate: boolean) => {
  let timeout: any, result: any
  const debounced: any = function (this: any) {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => (timeout = null), wait)
      if (callNow) {
        result = func.apply(this, arguments)
      }
    } else {
      timeout = setTimeout(() => (result = func.apply(this, arguments)), wait)
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}

export const throttle = (func: Function, wait: number, options: any = {}) => {
  let timeout: any, context: any, args: any
  let previous = 0

  const later = function () {
    previous = Number(options.leading) || new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) {
      context = args = null
    }
  }

  const throttled: any = function (this: any) {
    const now = new Date().getTime()
    if (!previous && options.leading === false) {
      previous = now
    }
    const remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) {
        context = args = null
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }
  return throttled
}
