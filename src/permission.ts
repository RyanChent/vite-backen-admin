import router from "./router";
import NProgress from "nprogress";
import { setDomTitle } from "./utils/dom";
import { isNotEmptyString } from "./utils/types";
import Storage from "./utils/storage";
import { importantKeys } from '@/data/enum.ts'
const storage = new Storage();
const whitePath: Array<string> = ["/user/login"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (isNotEmptyString(to.meta.title)) {
    setDomTitle(to.meta.title as string);
  }
  if (storage.getItem(importantKeys.TOKEN)) {
    if (whitePath.includes(to.path)) {
      next();
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (whitePath.includes(to.path)) {
      next()
    } else {
      next({ path: "/user/login", query: { redirect: to.fullPath } });
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
