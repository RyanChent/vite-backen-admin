import { RouterView } from 'vue-router'
const editor = [
  {
    path: "/editor",
    name: "Editor",
    meta: {
      icon: "el-icon-edit",
      title: "editor-page",
    },
    redirect: '/editor/showPreview',
    component: RouterView,
    children: [
      {
        path: '/editor/showPreview',
        name: 'ShowEditor',
        meta: {
          icon: "el-icon-edit",
          title: "show-editor-page",
        },
        component: () => import("@/views/Editor/index.tsx"),
      }
    ]
  },
];

export default editor;
