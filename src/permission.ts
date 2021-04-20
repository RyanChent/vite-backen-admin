import router from "./router";
import NProgress from "nprogress";
import { setDomTitle } from "./utils/dom";
import { isNotEmptyString } from "./utils/types";
import Storage from "./utils/storage";
const storage = new Storage();
const key = "token";
const whitePath: Array<string> = ["/login"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (isNotEmptyString(to.meta.title)) {
    setDomTitle(to.meta.title as string);
  }
  if (storage.getItem(key)) {
    if (whitePath.includes(to.path)) {
      next();
      NProgress.done();
    } else {
      next();
    }
  } else {
    next();
    // whitePath.includes(to.path)
    //   ? next()
    //   : next({ path: "/login", query: { redirect: to.fullPath } });
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
