import { constRoutes, asyncRoutes, removeRoute } from '@/router'
import { RouterView } from 'vue-router'
import { isMobile, isFunction, isNotEmptyString } from '@/utils/types'
import { deepClone } from '@/utils/data'
import { getRouter } from '@/api/backen/router'

let addNames: any = []

const hasPermission = (route: any, filters: any): boolean => {
  if (route.meta?.permission) {
    return filters.some((key: string) => route.meta.permission.includes(key))
  }
  return true
}

const RouteShow = (route: any, isMobile: boolean) =>
  !route.hidden &&
  (!route.meta?.hasOwnProperty('showMobile') || route.meta?.showMobile === isMobile)

const filterAsyncRoutes = (routes: any[], filters: any, isMobile: boolean): any[] =>
  routes.filter((route: any) => {
    if (!RouteShow(route, isMobile)) {
      return false
    } else {
      if (hasPermission(route, filters)) {
        addNames.push(route.name)
        if (isNotEmptyString(route.component)) {
          switch (route.component) {
            case 'RouterView':
              route.component = RouterView
              break
            default:
              const path = route.component
              import(`${path}`).then(console.log)
              break
          }
        }
        if (Array.isArray(route.children) && route.children.length) {
          route.children = filterAsyncRoutes(route.children, filters, isMobile)
          if (route.children[0]) {
            route.hasOwnProperty('redirect') && (route.redirect = route.children[0].path)
          } else {
            addNames.splice(addNames.indexOf(route.name), 1)
            return false
          }
        }
        return true
      }
      return false
    }
  })

const generateAsyncRoutes = async (routes: Array<object>, routeKeys: any, isMobile: boolean) => {
  /* 拉取后端路由信息接口 */
  await getRouter({
    role: routeKeys[0],
    isMobile
  })
    .then((data: any) => {
      routes = filterAsyncRoutes(data, routeKeys, isMobile)
    })
    .catch((err: any) => {
      if (err.isAxiosError) {
        if (Array.isArray(asyncRoutes) && asyncRoutes.length) {
          routes = filterAsyncRoutes(deepClone(asyncRoutes), routeKeys, isMobile)
        }
      }
    })
}

const permission = {
  state: {
    routes: constRoutes,
    addRoutes: []
  },
  mutations: {
    SET_ROUTES(state: any, routes: Array<object>) {
      state.addRoutes = routes
      state.routes = [...constRoutes, ...routes]
    },
    RESET_ROUTES(state: any) {
      state.routes = constRoutes
      state.addRoutes = []
      addNames = []
    }
  },
  actions: {
    generateRoutes({ commit }: any, routeKeys: Array<string>) {
      return new Promise(async (resolve, reject) => {
        removeRoute(addNames)
        commit('RESET_ROUTES')
        const isPhone = isMobile()
        try {
          let routes: Array<any> = []
          // await generateAsyncRoutes(routes, routeKeys, isPhone)
          if (Array.isArray(asyncRoutes) && asyncRoutes.length) {
            routes = filterAsyncRoutes(deepClone(asyncRoutes), routeKeys, isPhone)
          } else {
            await generateAsyncRoutes(routes, routeKeys?.[0], isPhone)
          }

          if (isPhone) {
            routes = [
              ...routes,
              {
                path: '/me',
                name: 'UserPage',
                hidden: true,
                meta: {
                  title: 'user-page'
                },
                component: () => import('@/views/User')
              }
            ]
            addNames.push('UserPage')
          }

          routes = [
            ...routes,
            {
              path: '/:w+',
              name: '*',
              hidden: true,
              redirect: '/404'
            },
            {
              path: '/404',
              hidden: true,
              name: 'NotFound',
              meta: {
                title: '404-page'
              },
              component: () => import('@/views/404')
            }
          ]

          addNames = [...addNames, '*', 'NotFound']

          commit('SET_ROUTES', routes)
          resolve(routes)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}

export { permission }
