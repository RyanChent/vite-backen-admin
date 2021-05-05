const table = [
  {
    path: "/table",
    name: "Table",
    meta: {
      title: "table-page",
      icon: "el-icon-notebook-1",
    },
    component: () => import("@/views/Table/index.tsx"),
  },
];

export default table