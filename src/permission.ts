import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { setDomTitle } from './utils/dom'
import { isNotEmptyString, isMobile } from './utils/types'
import Storage from './utils/storage'
import { importantKeys } from '@/data/enum'
import { t } from './lang'
import { Dialog } from 'vant'
import ElMessageBox from 'element-plus/lib/el-message-box'
const storage = new Storage()
const whitePath: string[] = ['/login', '/forget', '/register']
router.beforeEach((to, from, next) => {
  NProgress.start()
  store.dispatch('setLoading', true)
  if (isNotEmptyString(to.meta.title)) {
    setDomTitle(t(to.meta.title as string))
  }
  const token = storage.getItem(importantKeys.TOKEN)
  if (isNotEmptyString(token)) {
    if (whitePath.includes(to.path)) {
      if (to.path === '/login') {
        const confirm: Promise<any> = isMobile()
          ? Dialog.confirm({
              title: '提示',
              message: '是否退出登录？'
            })
          : ElMessageBox.confirm('是否退出登录？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
        confirm
          .then(async () => {
            await store.dispatch('logout')
          })
          .catch(console.log)
      } else {
        next()
        NProgress.done()
      }
    } else {
      if ((store.state as any).user.roles.length === 0) {
        store
          .dispatch('getInfo', [(store.state as any).user.userInfo.role])
          .then(async (roles) => {
            await store.dispatch('generateRoutes', roles).then((asyncRoutes) => {
              asyncRoutes.forEach((asyncRoute: any) => router.addRoute(asyncRoute))
              const redirect = decodeURIComponent((from.query.redirect || to.path) as string)
              if (to.path === redirect) {
                next({ ...to, replace: true })
              } else {
                next({ path: redirect })
              }
            })
          })
          .catch((e: Error) => {
            store.dispatch('logout').then(() => {
              next({ path: '/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whitePath.includes(to.path)) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  setTimeout(() => {
    store.dispatch('setLoading', false)
  }, 200)
  NProgress.done()
})
