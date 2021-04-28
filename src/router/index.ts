import { createRouter, createWebHistory } from "vue-router";
import constRoutes from "./userRouters";

const asyncRoutes = Object.values(
  import.meta.globEager("./subRouters/*.ts")
).map(({ default: route }) => route[0]);

export { constRoutes, asyncRoutes };

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...constRoutes,
    {
      path: "/:w+",
      name: "*",
      redirect: "/login",
    },
  ],
});

export default router;
