import { RouterView } from "vue-router";

const dialogsRoutes = [
  {
    path: "/",
    redirect: "/dialog",
    meta: {
      icon: "el-icon-s-home",
      title: "nest-menu-page",
    },
    component: RouterView,
    children: [
      {
        path: "/dialog",
        name: "Dialogs",
        meta: {
          icon: "el-icon-message",
          title: "dialogs-page",
        },
        component: () => import("@/views/Dialogs/index.tsx"),
      },
    ],
  },
];

export default dialogsRoutes;
