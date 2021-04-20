import { createRouter, createWebHashHistory } from "vue-router";
/**
 * @param subRoutes
 * @description 子模块路由
 */
const subRoutes = Object.values(import.meta.globEager("./subRouters/*.ts")).map(
  ({ default: route }) => route[0]
);

/**
 * @param routes
 * @description 全部路由
 */

const routes = [...subRoutes];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
