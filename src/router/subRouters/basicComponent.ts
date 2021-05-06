import { RouterView } from "vue-router";

const basicComponent = [
  {
    path: "/",
    redirect: "/icons",
    meta: {
      icon: "el-icon-s-home",
      title: "basic-component",
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
      {
        path: "/charts",
        name: "Charts",
        meta: {
          icon: "el-icon-s-data",
          title: "charts-page",
        },
        component: () => import("@/views/Echarts/index.tsx"),
      },
      {
        path: "/icons",
        name: "Icons",
        meta: {
          icon: "el-icon-picture-outline-round",
          title: "icons-page",
        },
        component: () => import("@/views/Icons/index.tsx"),
      },
      {
        path: "/editor",
        name: "Editor",
        meta: {
          icon: "el-icon-edit",
          title: "editor-page",
        },
        component: () => import("@/views/Editor/index.tsx"),
      },
      {
        path: "/table",
        name: "Table",
        meta: {
          title: "table-page",
          icon: "el-icon-notebook-1",
        },
        component: () => import("@/views/Table/index.tsx"),
      },
    ],
  },
];

export default basicComponent;
