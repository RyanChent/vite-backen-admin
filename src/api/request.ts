import axios from 'axios'
import Storage from '@/utils/storage'
import { isNotEmptyString, isMobile } from '@/utils/types'
import store from '@/store'
import ElNotification from 'element-plus/lib/el-notification'
import { Notify } from 'vant'
const storage = new Storage()
const whiteApi = ['/login']

const ErrorMessage = (obj: any) =>
  !!isMobile()
    ? Notify({ type: 'danger', message: obj.message || '出错了' })
    : ElNotification({
        type: 'error',
        title: '出错了',
        message: obj.message || '出错了'
      })

const request: any = axios.create({
  timeout: 60 * 1000,
  baseURL: (window as any)._config.github
})

request.interceptors.request.use(
  (config: any) => {
    config.baseURL = (window as any)._config[config.type || 'github']
    const hasToken = isNotEmptyString(storage.getItem('token'))
    if (hasToken || whiteApi.includes(config.url)) {
      // config.headers['token'] = storage.getItem('token')
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
      /* 接口正常后，这里取消注释 */
      // store.dispatch("logout");
      throw new Error('登陆超时，请重新登录')
    }
  },
  (error: any) => Promise.reject(error)
)

request.interceptors.response.use(
  (response: any) => {
    const { data } = response
    if (response.headers['content-disposition']) {
      return Promise.resolve(response)
    }
    if (data.success || data.code === 200) {
      return Promise.resolve(data.result)
    } else {
      if (data.code === 401) {
        store.dispatch('logout')
      }
      if (data) {
        return Promise.resolve(data)
      } else {
        // ErrorMessage(data)
        return Promise.reject(data.message)
      }
    }
  },
  (error: any) => {
    const { config } = error
    if (!config || !config.retry) {
      // ErrorMessage(error)
      return Promise.reject(error)
    } else {
      config.$retryCount = config.$retryCount || 0
      if (config.$retryCount >= config.retry) {
        // ErrorMessage(error)
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
