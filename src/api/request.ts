import axios from 'axios'
import Storage from '@/utils/storage'
import { isNotEmptyString, isMobile } from '@/utils/types'
import store from '@/store'
import Notification from 'element-plus/lib/el-notification'
import { Toast } from 'vant'
const storage = new Storage()
const whiteApi = ['/login', '/forgetpwd', '/register', '/resetpwd', '/getCaptcha']

const MessageShow = (obj: any, type: any = 'fail') => {
  const isPhone = isMobile()
  if (type === 'fail') {
    !isPhone && Notification({ type: 'error', title: '出错了', message: obj.message || '出错了' })
  } else {
    isPhone
      ? (Toast as any)[type]?.(obj.message || '操作成功')
      : Notification({ type, title: '操作成功', message: obj.message })
  }
}

const request: any = axios.create({
  timeout: 60 * 1000,
  baseURL: (window as any)._config.github
})

request.interceptors.request.use(
  (config: any) => {
    config.baseURL = (window as any)._config[config.type || 'github']
    const hasToken = isNotEmptyString(storage.getItem('token'))
    if (hasToken || whiteApi.includes(config.url)) {
      if (config.type === 'backen') {
        config.headers['token'] = storage.getItem('token')
      }
      if (config.method === 'get') {
        config.params = Object.assign({}, config.params, { t: new Date().getTime() })
      }
      if (config.url.toLowerCase().includes('download')) {
        config.responseType = 'blob'
      }
      if (config.url.toLowerCase().includes('upload')) {
        config.headers['Content-Type'] = 'multipart/form-data'
      }
      return config
    } else {
      throw new Error('登陆超时，请重新登录')
    }
  },
  (error: any) => Promise.reject(error)
)

request.interceptors.response.use(
  (response: any) => {
    const { data, config } = response
    if (response.headers['content-disposition']) {
      return Promise.resolve(response)
    }
    if (data.success || data.code === 200) {
      if (!['/login', '/getCaptcha'].includes(config.url)) {
        MessageShow(data.message || data.result, 'success')
      }
      return Promise.resolve(data.result || data)
    } else {
      if (data.code === 401) {
        store.dispatch('logout')
      }
      if ([500, 403, 404, 502, 503].includes(data.code)) {
        return Promise.reject(data)
      }
      if (data) {
        return Promise.resolve(data)
      }
    }
  },
  (error: any) => {
    const { config } = error
    if (!config || !config.retry) {
      return Promise.reject(error)
    } else {
      config.$retryCount = config.$retryCount || 0
      if (config.$retryCount >= config.retry) {
        return Promise.reject(error)
      }
      config.$retryCount += 1

      return new Promise((resolve) => setTimeout(resolve, config.retryDelay || 1)).then(() =>
        request(config)
      )
    }
  }
)

export default request
