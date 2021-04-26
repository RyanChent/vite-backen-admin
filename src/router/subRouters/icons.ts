const iconRoutes = [
  {
    path: "/icons",
    name: "Icons",
    meta: {
      icon: "el-icon-picture-outline-round",
      title: "icons-page",
    },
    component: () => import("@/views/Icons/index.tsx"),
  },
];

export default iconRoutes;
