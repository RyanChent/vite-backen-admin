import { RouterView } from "vue-router";

const homeRoutes = [
  {
    path: "/",
    redirect: "/dialog",
    meta: {
      icon: "el-icon-s-home",
      title: "首页",
    },
    component: RouterView,
    children: [
      {
        path: "/dialog",
        name: "Dialogs",
        meta: {
          icon: "el-icon-message",
          title: "弹窗页",
        },
        component: () => import("@/views/Dialogs/index.tsx"),
      },
    ],
  },
];

export default homeRoutes;
