import { createRouter, createWebHistory } from "vue-router";
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
  history: createWebHistory(),
  routes,
});

export default router;
