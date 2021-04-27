import { RouterView } from "vue-router";

const UserRoutes = [
  {
    path: "/login",
    hidden: true,
    name: "login",
    meta: {
      title: "login-page",
      icon: "el-icon-share",
    },
    component: () => import("@/views/Login/index.tsx"),
  },
];

export default UserRoutes;
