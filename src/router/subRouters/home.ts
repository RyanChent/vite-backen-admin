import { RouterView } from "vue-router";

const homeRoutes = [
  {
    path: "/",
    redirect: "/home",
    component: RouterView,
    children: [
      {
        path: "/home",
        name: "Home",
        title: "首页",
        meta: {
          icon: "el-icon-s-home",
        },
        component: () => import("@/views/Home/index.vue"),
      },
    ],
  },
];

export default homeRoutes;
