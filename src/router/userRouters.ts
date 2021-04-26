import { RouterView } from "vue-router";

const UserRoutes = [
  {
    path: "/user",
    component: RouterView,
    redirect: "/user/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: {
          title: "login-page",
          icon: "el-icon-share",
        },
        component: () => import("@/views/Login/index.tsx"),
      },
    ],
  },
];

export default UserRoutes;
