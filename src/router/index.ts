import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    title: "主页",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/price",
    name: "Price",
    title: "价格",
    component: () => import("../views/Price"),
  },
  {
    path: "/about",
    name: "About",
    title: "关于我们",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/help",
    name: "Help",
    title: "帮助中心",
    component: () => import("../views/Help.vue"),
  },
  {
    path: "/private",
    name: "Private",
    title: "隐私政策",
    component: () => import("../views/Priviate.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
