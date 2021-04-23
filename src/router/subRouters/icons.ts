const iconRoutes = [
  {
    path: "/icons",
    name: "Icons",
    meta: {
      icon: "el-icon-picture-outline-round",
      title: "图标页",
    },
    component: () => import("@/views/Icons/index.tsx"),
  },
];

export default iconRoutes