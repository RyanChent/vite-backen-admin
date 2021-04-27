import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import { setDomTitle } from "./utils/dom";
import { isNotEmptyString } from "./utils/types";
import Storage from "./utils/storage";
import { importantKeys } from "@/data/enum.ts";
import { t } from "./lang";
const storage = new Storage();
const whitePath: Array<string> = ["/login"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (isNotEmptyString(to.meta.title)) {
    setDomTitle(t(to.meta.title as string));
  }
  if (storage.getItem(importantKeys.TOKEN)) {
    if (whitePath.includes(to.path)) {
      next();
      NProgress.done();
    } else {
      if ((store.state as any).user.roles.length === 0) {
        store
          .dispatch("getInfo")
          .then((roles) => {
            store.dispatch("generateRoutes", roles).then((asyncRoutes) => {
              asyncRoutes.forEach((asyncRoute: any) =>
                router.addRoute(asyncRoute)
              );
              const redirect = decodeURIComponent(
                (from.query.redirect || to.path) as string
              );
              if (to.path === redirect) {
                next({ ...to, replace: true });
              } else {
                next({ path: redirect });
              }
            });
          })
          .catch((e: Error) => {
            store.dispatch("logout").then(() => {
              next({ path: "/login", query: { redirect: to.fullPath } });
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (whitePath.includes(to.path)) {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
