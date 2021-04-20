import { RouterView } from "vue-router";

const homeRoutes = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      icon: "el-icon-s-home",
      title: "首页",
    },
    component: RouterView,
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          icon: "el-icon-s-home",
          title: "首页",
        },
        component: () => import("@/views/Home/index.vue"),
      },
    ],
  },
];

export default homeRoutes;
