const UserRoutes = [
  {
    path: "/login",
    hidden: true,
    name: "login",
    meta: {
      title: "login-page",
      icon: "el-icon-share",
    },
    component: () => import("@/views/Login"),
  },
];

export default UserRoutes;
