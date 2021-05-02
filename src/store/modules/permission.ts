import { constRoutes, asyncRoutes } from "../../router";
import { isMobile } from '@/utils/types.ts'
const hasPermission = (route: any, filters: any): boolean => {
  if (route.meta?.permission) {
    return filters.some((key: string) => route.meta.permission.includes(key));
  }
  return true;
};

const filterAsyncRoutes = (routes: Array<object>, filters: any): Array<any> =>
  routes.filter((route: any) => {
    if (hasPermission(route, filters)) {
      if (Array.isArray(route.children) && route.children.length) {
        route.children = filterAsyncRoutes(route.children, filters);
        if (route.children[0]) {
          route.hasOwnProperty("redirect") &&
            (route.redirect = route.children[0].path);
        } else {
          return false;
        }
      }
      return true;
    }
    return false;
  });

const generateAsyncRoutes = async (routes: Array<object>) => {
  /* 拉取后端路由信息接口 */
};

const permission = {
  state: {
    routes: constRoutes,
    addRoutes: [],
  },
  mutations: {
    SET_ROUTES(state: any, routes: Array<object>) {
      state.addRoutes = routes;
      state.routes = [...constRoutes, ...routes];
    },
  },
  actions: {
    generateRoutes({ commit }: any, routeKeys: Array<string>) {
      return new Promise(async (resolve, reject) => {
        try {
          let routes: Array<object> = [];
          if (Array.isArray(asyncRoutes) && asyncRoutes.length) {
            routes = filterAsyncRoutes(asyncRoutes, routeKeys)
          } else {
            await generateAsyncRoutes(routes);
          }

          if (isMobile()) {
            routes = [
              ...routes,
              {
                path: '/me',
                name: 'UserPage',
                hidden: true,
                meta: {
                  title: 'user-page'
                },
                component: () => import('@/views/User/index.tsx')
              }
            ]
          }
          commit("SET_ROUTES", routes);
          resolve(routes);
        } catch (e) {
          reject(e);
        }
      });
    },
  },
};

export { permission };
