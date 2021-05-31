const isJsonString = (str: string): boolean => {
  try {
    return typeof str === 'string' && typeof JSON.parse(str) === 'object'
  } catch (e) {
    return false
  }
}

class Storage {
  private isBrowser = false
  constructor() {
    this.isBrowser = typeof localStorage !== 'undefined'
  }
  getItem(key: string): any {
    if (this.isBrowser) {
      const item = localStorage.getItem(key) as any
      if (isJsonString(item)) {
        const { value, timeout, date } = JSON.parse(item)
        if (typeof timeout === 'number') {
          if (Date.now() - date <= timeout) {
            return isJsonString(value) ? JSON.parse(value) : value
          } else {
            localStorage.removeItem(key)
            return null
          }
        }
        return isJsonString(value) ? JSON.parse(value) : value
      }
    }
    return null
  }

  setItem(key: string, value: any, timeout: number): void {
    if (this.isBrowser) {
      localStorage.setItem(
        key,
        JSON.stringify({
          value,
          timeout,
          date: Date.now()
        })
      )
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key)
    }
  }

  clear(): void {
    if (this.isBrowser) {
      localStorage.clear()
    }
  }
}

export default Storage
