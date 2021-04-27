const editor = [
  {
    path: "/editor",
    name: "Editor",
    meta: {
      icon: "el-icon-edit",
      title: "editor-page",
    },
    component: () => import("@/views/Editor/index.tsx"),
  },
];

export default editor;
