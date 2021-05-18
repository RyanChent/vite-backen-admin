export default [
  {
    path: "/component",
    name: "Components",
    meta: {
      title: "component-page",
      icon: "el-icon-setting",
      keepAlive: true,
    },
    component: () => import("@/views/Component/index.tsx"),
  },
];
