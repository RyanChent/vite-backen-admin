import axios from 'axios'
import Storage from '@/utils/storage'
import ElNotification from 'element-plus/lib/el-notification'
import { Notify } from 'vant'
import { isNotEmptyString } from '@/utils/types'
const storage = new Storage()
axios.defaults.withCredentials = true
const request = axios.create({
    timeout: 60 * 1000,
    baseURL: 'http://openapi.baidu.com/oauth/2.0'
})
const whiteApi = ['/authorize', '/token']
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

request.interceptors.request.use(
    (config: any) => {
        const hasToken = isNotEmptyString(storage.getItem('access_token'))
        if (hasToken || whiteApi.includes(config.url)) {
            if (config.method === 'get') {
                Object.assign(config.params, { t: new Date().getTime() }, hasToken && {
                    'access_token': storage.getItem('access_token')
                })
            }
            return config
        } else {
            console.log('ok')
        }
    },
    (error) => Promise.reject(error)
)

request.interceptors.response.use(
    (response: any) => {
        console.log(response)
        return response
    },
    (error) => {
        if (error.response) {
            return Promise.reject(error)
        }
        return Promise.reject(new Error('请求超时'))
    }
)

export default request
