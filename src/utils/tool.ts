export function parseTime(time: any, cFormat = '{y}-{m}-{d} {h}:{i}:{s}'): string {
    if (arguments.length === 0) {
        return ''
    }
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = (formatObj as any)[key]
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

export const downFile = (blob: Blob, filename: string, suffix = '' ): void => {
    const a = document.createElement('a')
    const downname = filename.includes(suffix) ? filename : filename + suffix
    if ('download' in a) {
        a.href = URL.createObjectURL(blob);
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

export const toCamel = (str: string) => str.replace(/\_(\w)/g, (self, letter) => letter.toUpperCase());
export const toMidLine = (str: string) => str.replace(/([A-Z])/g, "-$1").toLowerCase();
export const uuid = (length = 35) => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
}).slice(0, length + 1);