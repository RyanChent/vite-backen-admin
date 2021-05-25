import { constRoutes, asyncRoutes, removeRoute } from "@/router/index.ts";
import { isMobile } from "@/utils/types.ts";

let addNames: any = [];

const hasPermission = (route: any, filters: any): boolean => {
  if (route.meta?.permission) {
    return filters.some((key: string) => route.meta.permission.includes(key));
  }
  return true;
};

const RouteShow = (route: any, isMobile: boolean) =>
  !route.hidden &&
  (!route.meta?.hasOwnProperty("showMobile") ||
    route.meta?.showMobile === isMobile);

const filterAsyncRoutes = (
  routes: Array<object>,
  filters: any,
  isMobile: boolean
): Array<any> =>
  routes.filter((route: any) => {
    if (!RouteShow(route, isMobile)) {
      return false;
    } else {
      if (hasPermission(route, filters)) {
        addNames.push(route.name);
        if (Array.isArray(route.children) && route.children.length) {
          route.children = filterAsyncRoutes(route.children, filters, isMobile);
          if (route.children[0]) {
            route.hasOwnProperty("redirect") &&
              (route.redirect = route.children[0].path);
          } else {
            addNames.splice(addNames.indexOf(route.name), 1);
            return false;
          }
        }
        return true;
      }
      return false;
    }
  });

const generateAsyncRoutes = async (
  routes: Array<object>,
  isMobile: boolean
) => {
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
    RESET_ROUTES(state: any) {
      state.routes = constRoutes;
      state.addRoutes = [];
      addNames = []
    },
  },
  actions: {
    generateRoutes({ commit }: any, routeKeys: Array<string>) {
      return new Promise(async (resolve, reject) => {
        removeRoute(addNames);
        commit("RESET_ROUTES");
        const isPhone = isMobile();
        try {
          let routes: Array<object> = [];
          if (Array.isArray(asyncRoutes) && asyncRoutes.length) {
            routes = filterAsyncRoutes(asyncRoutes, routeKeys, isPhone);
          } else {
            await generateAsyncRoutes(routes, isPhone);
          }

          if (isPhone) {
            routes = [
              ...routes,
              {
                path: "/me",
                name: "UserPage",
                hidden: true,
                meta: {
                  title: "user-page",
                },
                component: () => import("@/views/User/index.tsx"),
              },
            ];
            addNames.push("UserPage");
          }

          routes = [
            ...routes,
            {
              path: "/:w+",
              name: "*",
              hidden: true,
              redirect: "/404",
            },
            {
              path: "/404",
              hidden: true,
              name: "NotFound",
              meta: {
                title: "404-page",
              },
              component: () => import("@/views/404/index.tsx"),
            },
          ];

          addNames.push("*");
          addNames.push("NotFound");

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
