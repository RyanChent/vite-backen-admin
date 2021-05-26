import { RouterView } from "vue-router";

const basicComponent = [
  {
    path: "/",
    redirect: "/icons",
    name: "Home",
    meta: {
      icon: "el-icon-s-home",
      title: "basic-component",
    },
    component: RouterView,
    children: [
      {
        path: "/icons",
        name: "IconPage",
        meta: {
          icon: "el-icon-picture-outline-round",
          title: "icons-page",
          keepAlive: true,
          permission: ["admin", "customer"],
        },
        component: () => import("@/views/Icons/index.tsx"),
      },
      {
        path: "/dialog",
        name: "DialogPage",
        meta: {
          icon: "el-icon-message",
          title: "dialogs-page",
          keepAlive: true,
          showMobile: false,
          permission: ["admin", "customer"],
        },
        component: () => import("@/views/Dialogs/index.tsx"),
      },
      {
        path: "/charts",
        name: "ChartsPage",
        meta: {
          icon: "el-icon-s-data",
          title: "charts-page",
          keepAlive: true,
          permission: ["admin"],
        },
        component: () => import("@/views/Echarts/index.tsx"),
      },
      {
        path: "/editor",
        name: "EditorPage",
        meta: {
          icon: "el-icon-edit",
          title: "editor-page",
          keepAlive: true,
          permission: ["admin"],
        },
        component: () => import("@/views/Editor/index.tsx"),
      },
      {
        path: "/table",
        name: "TablePage",
        meta: {
          title: "table-page",
          icon: "el-icon-notebook-1",
          keepAlive: true,
          permission: ["admin", "customer"],
        },
        component: () => import("@/views/Table/index.tsx"),
      },
      {
        path: "/upload",
        name: "UploadPage",
        meta: {
          title: "upload-page",
          icon: "el-icon-upload",
          keepAlive: true,
          permission: ["admin", "customer"],
        },
        component: () => import("@/views/Upload/index.tsx"),
      },
      {
        path: "/steps",
        name: "StepsPage",
        meta: {
          title: "steps-page",
          icon: "el-icon-s-order",
          keepAlive: true,
          permission: ["admin", "customer"],
        },
        component: () => import("@/views/Steps/index.tsx"),
      },
      {
        path: "/json",
        name: "JsonPage",
        meta: {
          title: "json-page",
          icon: "el-icon-notebook-2",
          keepAlive: true,
          permission: ["admin"],
          showMobile: false,
        },
        component: () => import("@/views/Json/index.tsx"),
      },
    ],
  },
];

export default basicComponent;
